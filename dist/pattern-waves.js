import { Renderer } from "./vendor/ogl/src/core/Renderer.js";
import { Program } from "./vendor/ogl/src/core/Program.js";
import { Mesh } from "./vendor/ogl/src/core/Mesh.js";
import { RenderTarget } from "./vendor/ogl/src/core/RenderTarget.js";
import { Texture } from "./vendor/ogl/src/core/Texture.js";
import { Triangle } from "./vendor/ogl/src/extras/Triangle.js";

const container = document.querySelector("[data-pattern-waves]");

if (container) {
  initPatternWaves(container);
}

function initPatternWaves(root) {
  let renderer;

  try {
    renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
    });
  } catch {
    root.dataset.patternWaves = "unsupported";
    return;
  }

  const gl = renderer.gl;

  if (!renderer.isWebgl2) {
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    root.dataset.patternWaves = "unsupported";
    return;
  }

  const settings = {
    spacing: 10,
    markSize: 0.86,
    depth: 0.8,
    light: 6,
    shine: 0.82,
    contrast: 1.25,
    speed: 0.25,
    scale: 1.08,
    direction: 22,
    color: [71 / 255, 199 / 255, 252 / 255],
    opacity: 0.38,
    fadeSize: 0.48,
    cursorSize: 72,
    cursorStrength: 0.34,
  };

  const WAVE_UNIT = 520;
  const RIPPLE_CELL = 9;
  const RIPPLE_RATE = 60;
  const PIXEL_BUDGET = 3.2e6;
  const INTRO_SECONDS = 1.8;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const passVertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

  const fieldFragment = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uSize;
uniform float uDpr;
uniform vec2 uOrigin;
uniform vec2 uPitch;
uniform float uTime;
uniform float uUnit;
uniform vec2 uHeading;
uniform float uAmp;
uniform float uDepth;
uniform vec3 uLight;
uniform float uShine;
uniform float uContrast;
uniform float uOpacity;
uniform float uFadeSize;
uniform float uAppear;
uniform sampler2D tRipple;
uniform float uRipple;
out vec4 fragColor;

const float FOLDS = 5.5;

uvec3 scramble(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  return v;
}

vec3 lattice(vec3 corner) {
  uvec3 h = scramble(uvec3(ivec3(corner) + 4096));
  return vec3(h & 65535u) / 32767.5 - 1.0;
}

float gradientNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = p - i;
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float n000 = dot(lattice(i), f);
  float n100 = dot(lattice(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0));
  float n010 = dot(lattice(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0));
  float n110 = dot(lattice(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0));
  float n001 = dot(lattice(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0));
  float n101 = dot(lattice(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0));
  float n011 = dot(lattice(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0));
  float n111 = dot(lattice(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0));
  return mix(
    mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
    mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
    u.z
  );
}

float surface(vec2 p, float t) {
  vec2 side = vec2(-uHeading.y, uHeading.x);
  float u = dot(p, uHeading);
  float v = dot(p, side);
  float bend = gradientNoise(vec3(v * 0.85, u * 0.3, t * 0.05)) * 1.7
    + 0.4 * sin(v * 1.6 + t * 0.2);
  float phase = u * FOLDS + bend - t * 0.45;
  float swell = 0.6 + 0.4 * gradientNoise(vec3(u * 0.55 + 3.0, v * 0.45, t * 0.04));
  float fold = sin(phase) + 0.32 * sin(2.0 * phase + 1.3);
  float ripple = 0.16 * sin(u * FOLDS * 2.5 + bend * 1.9 - t * 0.9 + 2.1);
  return (fold + ripple) * swell;
}

float heightAt(vec2 css) {
  float h = surface((css - 0.5 * uSize) / uUnit, uTime) * uAmp;
  if (uRipple > 0.0) h += texture(tRipple, css / uSize).r * uRipple;
  return h;
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy);
  vec2 center = uOrigin + (cell + 0.5) * uPitch;
  vec2 css = center / uDpr;
  vec2 uv = css / uSize;
  float e = max(uPitch.y / uDpr, 4.0);
  float h = heightAt(css);
  float hx = (heightAt(css + vec2(e, 0.0)) - heightAt(css - vec2(e, 0.0))) / (2.0 * e);
  float hy = (heightAt(css + vec2(0.0, e)) - heightAt(css - vec2(0.0, e))) / (2.0 * e);
  vec2 grad = vec2(hx, hy) * uUnit * uDepth * 0.4;
  vec3 n = normalize(vec3(-grad, 1.0));

  float diffuse = clamp(dot(n, uLight), 0.0, 1.0);
  vec3 halfway = normalize(uLight + vec3(0.0, 0.0, 1.0));
  float spec = pow(clamp(dot(n, halfway), 0.0, 1.0), 160.0) * uShine * 1.15;
  float hollow = 0.7 + 0.3 * clamp(h * 0.5 + 0.5, 0.0, 1.0);
  float tone = clamp(diffuse * hollow * 0.78 + spec, 0.0, 1.0);
  tone = clamp((tone - 0.42) * uContrast + 0.42, 0.0, 1.0);

  float level = pow(tone, 2.2);
  float emphasis = clamp(spec * 1.6, 0.0, 1.0);
  vec2 c = uv * 2.0 - 1.0;
  float fade = 1.0 - smoothstep(1.0 - uFadeSize, 1.18, length(c));
  float reach = length(css - 0.5 * uSize) / max(0.5 * length(uSize), 1.0);
  float appear = smoothstep(reach - 0.05, reach + 0.3, uAppear * 1.35);
  float alpha = uOpacity * fade * appear * (0.22 + 0.78 * level);
  float lift = clamp(h * uDepth * 0.42, -0.48, 0.48);

  fragColor = vec4(level, alpha, emphasis, lift + 0.5);
}
`;

  const rippleFragment = `#version 300 es
precision highp float;
uniform sampler2D tState;
uniform vec2 uTexel;
uniform vec2 uSize;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uRadius;
uniform float uImpulse;
uniform float uDamping;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy * uTexel;
  vec2 state = texture(tState, uv).rg;
  float left = texture(tState, uv - vec2(uTexel.x, 0.0)).r;
  float right = texture(tState, uv + vec2(uTexel.x, 0.0)).r;
  float below = texture(tState, uv - vec2(0.0, uTexel.y)).r;
  float above = texture(tState, uv + vec2(0.0, uTexel.y)).r;
  float next = ((left + right + below + above) * 0.5 - state.g) * uDamping;
  vec2 p = uv * uSize;
  vec2 segment = uTo - uFrom;
  float along = clamp(dot(p - uFrom, segment) / max(dot(segment, segment), 1e-4), 0.0, 1.0);
  float d = length(p - uFrom - segment * along) / uRadius;
  next -= uImpulse * exp(-d * d * 2.0);
  fragColor = vec4(next, state.r, 0.0, 1.0);
}
`;

  const markFragment = `#version 300 es
precision highp float;
precision highp int;
uniform sampler2D tField;
uniform vec2 uOrigin;
uniform vec2 uPitch;
uniform vec2 uGrid;
uniform float uMarkSize;
uniform vec3 uColor;
uniform vec3 uAccent;
out vec4 fragColor;

float coverage(vec2 local, float level) {
  float span = uPitch.y * uMarkSize;
  float area = max(sqrt(level), 0.14);
  return clamp(0.5 - (length(local) - 0.5 * span * area), 0.0, 1.0);
}

void main() {
  vec2 rel = gl_FragCoord.xy - uOrigin;
  float cx = floor(rel.x / uPitch.x);
  float row = floor(rel.y / uPitch.y);
  vec4 ink = vec4(0.0);

  if (cx >= 0.0 && cx < uGrid.x) {
    for (int k = -1; k <= 1; k++) {
      float cy = row + float(k);
      if (cy < 0.0 || cy >= uGrid.y) continue;
      vec4 f = texelFetch(tField, ivec2(int(cx), int(cy)), 0);
      if (f.g < 0.002) continue;
      vec2 center = (vec2(cx, cy) + 0.5) * uPitch + vec2(0.0, (f.a - 0.5) * uPitch.y);
      float alpha = coverage(rel - center, f.r) * f.g;
      if (alpha > ink.a) ink = vec4(mix(uColor, uAccent, f.b) * alpha, alpha);
    }
  }

  fragColor = ink;
}
`;

  gl.clearColor(0, 0, 0, 0);
  const canvas = gl.canvas;
  canvas.setAttribute("aria-hidden", "true");
  root.appendChild(canvas);
  root.dataset.patternWaves = "ready";

  const geometry = new Triangle(gl);
  const blank = new Texture(gl);
  const floatTargets = Boolean(gl.getExtension("EXT_color_buffer_float"));

  const disposeTarget = (target) => {
    gl.deleteFramebuffer(target.buffer);
    for (let index = 0; index < target.textures.length; index += 1) {
      gl.deleteTexture(target.textures[index].texture);
    }
  };

  const fieldTargetFor = (width, height) =>
    new RenderTarget(gl, {
      width,
      height,
      depth: false,
      minFilter: gl.NEAREST,
      magFilter: gl.NEAREST,
    });

  const rippleTargetFor = (width, height) =>
    new RenderTarget(gl, {
      width,
      height,
      depth: false,
      type: gl.HALF_FLOAT,
      format: gl.RGBA,
      internalFormat: gl.RGBA16F,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

  let fieldTarget = fieldTargetFor(1, 1);
  let ripple = null;

  const fieldUniforms = {
    uSize: { value: [1, 1] },
    uDpr: { value: 1 },
    uOrigin: { value: [0, 0] },
    uPitch: { value: [1, 1] },
    uTime: { value: 0 },
    uUnit: { value: WAVE_UNIT },
    uHeading: { value: [1, 0] },
    uAmp: { value: 0 },
    uDepth: { value: settings.depth },
    uLight: { value: [0, 0, 1] },
    uShine: { value: settings.shine },
    uContrast: { value: settings.contrast },
    uOpacity: { value: settings.opacity },
    uFadeSize: { value: settings.fadeSize },
    uAppear: { value: 0 },
    tRipple: { value: blank },
    uRipple: { value: 0 },
  };

  const fieldMesh = new Mesh(gl, {
    geometry,
    program: new Program(gl, {
      vertex: passVertex,
      fragment: fieldFragment,
      uniforms: fieldUniforms,
      depthTest: false,
      depthWrite: false,
    }),
  });

  const rippleUniforms = {
    tState: { value: blank },
    uTexel: { value: [1, 1] },
    uSize: { value: [1, 1] },
    uFrom: { value: [0, 0] },
    uTo: { value: [0, 0] },
    uRadius: { value: settings.cursorSize },
    uImpulse: { value: 0 },
    uDamping: { value: 0.975 },
  };

  const rippleMesh = new Mesh(gl, {
    geometry,
    program: new Program(gl, {
      vertex: passVertex,
      fragment: rippleFragment,
      uniforms: rippleUniforms,
      depthTest: false,
      depthWrite: false,
    }),
  });

  const markUniforms = {
    tField: { value: fieldTarget.texture },
    uOrigin: { value: [0, 0] },
    uPitch: { value: [1, 1] },
    uGrid: { value: [1, 1] },
    uMarkSize: { value: settings.markSize },
    uColor: { value: settings.color },
    uAccent: {
      value: settings.color.map((channel) => channel + (1 - channel) * 0.55),
    },
  };

  const markMesh = new Mesh(gl, {
    geometry,
    program: new Program(gl, {
      vertex: passVertex,
      fragment: markFragment,
      uniforms: markUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    }),
  });

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducedMotion = motionPreference.matches;
  let width = 1;
  let height = 1;
  let raf = 0;
  let last = performance.now();
  let time = 0;
  let introClock = 0;
  let visible = true;
  let menuPaused = document.body.classList.contains("nav-locked");
  let alive = true;
  let dirty = true;
  let rippleUntil = 0;
  let rippleLive = false;
  let rippleClock = 0;
  const pointer = {
    x: 0,
    y: 0,
    inside: false,
    placed: false,
    lastX: 0,
    lastY: 0,
    burst: 0,
  };

  const buildRipple = () => {
    if (!floatTargets) return;
    const rippleWidth = clamp(Math.ceil(width / RIPPLE_CELL), 4, 384);
    const rippleHeight = clamp(Math.ceil(height / RIPPLE_CELL), 4, 384);

    if (ripple && ripple.width === rippleWidth && ripple.height === rippleHeight) {
      return;
    }

    if (ripple) {
      disposeTarget(ripple.read);
      disposeTarget(ripple.write);
    }

    ripple = {
      width: rippleWidth,
      height: rippleHeight,
      read: rippleTargetFor(rippleWidth, rippleHeight),
      write: rippleTargetFor(rippleWidth, rippleHeight),
    };
    rippleLive = false;
  };

  const clearRipple = () => {
    if (!ripple) return;
    const targets = [ripple.read, ripple.write];

    for (let index = 0; index < targets.length; index += 1) {
      const target = targets[index];
      renderer.bindFramebuffer(target);
      gl.viewport(0, 0, target.width, target.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    renderer.bindFramebuffer();
  };

  const start = () => {
    if (raf || !visible || !alive || menuPaused) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const resize = () => {
    width = Math.max(1, root.clientWidth);
    height = Math.max(1, root.clientHeight);
    renderer.dpr = Math.min(
      window.devicePixelRatio || 1,
      1.75,
      Math.sqrt(PIXEL_BUDGET / (width * height)),
    );
    renderer.setSize(width, height);
    buildRipple();
    dirty = true;
    start();
  };

  const stepRipple = (dt) => {
    rippleClock = Math.min(rippleClock + dt * RIPPLE_RATE, 4);
    const moved = Math.hypot(pointer.x - pointer.lastX, pointer.y - pointer.lastY);
    let impulse =
      (pointer.inside ? Math.min(moved / 14, 1) * 0.35 * settings.cursorStrength : 0)
      + pointer.burst * settings.cursorStrength;
    pointer.burst = 0;
    rippleUniforms.uTexel.value = [1 / ripple.width, 1 / ripple.height];
    rippleUniforms.uSize.value = [width, height];
    rippleUniforms.uFrom.value = [pointer.lastX, height - pointer.lastY];
    rippleUniforms.uTo.value = [pointer.x, height - pointer.y];

    while (rippleClock >= 1) {
      rippleClock -= 1;
      rippleUniforms.tState.value = ripple.read.texture;
      rippleUniforms.uImpulse.value = impulse;
      renderer.render({ scene: rippleMesh, target: ripple.write, clear: false });
      const previous = ripple.read;
      ripple.read = ripple.write;
      ripple.write = previous;
      impulse = 0;
    }

    pointer.lastX = pointer.x;
    pointer.lastY = pointer.y;
  };

  function frame(now) {
    raf = 0;
    if (!alive) return;

    const dt = Math.min(0.05, Math.max(1 / 240, (now - last) / 1000));
    last = now;
    const moving = !reducedMotion && !menuPaused && settings.speed !== 0;

    if (moving) time += dt * settings.speed;
    introClock = reducedMotion
      ? 1
      : Math.min(1, introClock + dt / INTRO_SECONDS);

    const appear = 1 - Math.pow(1 - clamp(introClock / 0.75, 0, 1), 3);
    const rise = clamp((introClock - 0.1) / 0.9, 0, 1);
    const amp = rise * rise * (3 - 2 * rise);
    const rippling =
      !reducedMotion && Boolean(ripple) && settings.cursorStrength > 0;

    if (rippling && pointer.inside && !pointer.placed) {
      pointer.lastX = pointer.x;
      pointer.lastY = pointer.y;
      pointer.placed = true;
    }

    if (rippling && (pointer.inside || pointer.burst > 0)) {
      rippleUntil = now + 4200;
    }

    const rippleActive = rippling && now < rippleUntil;

    if (rippleActive) {
      stepRipple(dt);
      rippleLive = true;
    } else if (rippleLive) {
      clearRipple();
      rippleLive = false;
    }

    const canvasWidth = gl.canvas.width;
    const canvasHeight = gl.canvas.height;
    const dpr = canvasWidth / width;
    const pitch = Math.max(4, Math.round(settings.spacing * dpr));
    const columns = Math.min(4096, Math.ceil(canvasWidth / pitch) + 1);
    const rows = Math.min(4096, Math.ceil(canvasHeight / pitch) + 2);
    const origin = [
      Math.floor((canvasWidth - columns * pitch) / 2),
      Math.floor((canvasHeight - rows * pitch) / 2),
    ];

    if (fieldTarget.width !== columns || fieldTarget.height !== rows) {
      disposeTarget(fieldTarget);
      fieldTarget = fieldTargetFor(columns, rows);
      markUniforms.tField.value = fieldTarget.texture;
    }

    const heading = (settings.direction * Math.PI) / 180;
    const lightAngle =
      ((settings.direction + 180 + clamp(settings.light, -90, 90)) * Math.PI)
      / 180;

    fieldUniforms.uSize.value = [width, height];
    fieldUniforms.uDpr.value = dpr;
    fieldUniforms.uOrigin.value = origin;
    fieldUniforms.uPitch.value = [pitch, pitch];
    fieldUniforms.uTime.value = time;
    fieldUniforms.uUnit.value = WAVE_UNIT * settings.scale;
    fieldUniforms.uHeading.value = [Math.cos(heading), Math.sin(heading)];
    fieldUniforms.uAmp.value = amp;
    fieldUniforms.uLight.value = [
      Math.cos(lightAngle) * 0.78,
      Math.sin(lightAngle) * 0.78,
      0.62,
    ];
    fieldUniforms.uAppear.value = appear;
    fieldUniforms.tRipple.value = rippleLive ? ripple.read.texture : blank;
    fieldUniforms.uRipple.value = rippleLive ? 0.32 : 0;
    renderer.render({ scene: fieldMesh, target: fieldTarget });

    markUniforms.uOrigin.value = origin;
    markUniforms.uPitch.value = [pitch, pitch];
    markUniforms.uGrid.value = [columns, rows];
    renderer.render({ scene: markMesh });
    dirty = false;

    if (visible && (moving || introClock < 1 || rippleActive || dirty)) {
      raf = requestAnimationFrame(frame);
    }
  }

  const locate = (event) => {
    const rect = root.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return {
      x,
      y,
      inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height,
    };
  };

  const onPointerMove = (event) => {
    const spot = locate(event);
    pointer.x = spot.x;
    pointer.y = spot.y;
    if (spot.inside !== pointer.inside) pointer.placed = false;
    pointer.inside = spot.inside;
    if (spot.inside) start();
  };

  const onPointerDown = (event) => {
    const spot = locate(event);
    if (!spot.inside) return;
    pointer.x = spot.x;
    pointer.y = spot.y;
    if (!pointer.inside) {
      pointer.lastX = spot.x;
      pointer.lastY = spot.y;
    }
    pointer.burst = 1.1;
    start();
  };

  const onPointerLeave = () => {
    pointer.inside = false;
    pointer.placed = false;
    start();
  };

  const onPointerOut = (event) => {
    if (!event.relatedTarget) onPointerLeave();
  };

  const onPointerUp = (event) => {
    if (event.pointerType === "touch") onPointerLeave();
  };

  const onVisibility = () => {
    if (!document.hidden) start();
  };

  const onMotionPreference = (event) => {
    reducedMotion = event.matches;
    dirty = true;
    start();
  };

  const onMenuActivity = (event) => {
    menuPaused = event.detail?.paused === true;

    if (menuPaused) {
      cancelAnimationFrame(raf);
      raf = 0;
      pointer.inside = false;
      pointer.placed = false;
      pointer.burst = 0;
      return;
    }

    dirty = true;
    start();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerout", onPointerOut, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("blur", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibility);
  motionPreference.addEventListener("change", onMotionPreference);
  window.addEventListener("rerol:menu-activity", onMenuActivity);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    start();
  });
  intersectionObserver.observe(root);

  const destroy = () => {
    if (!alive) return;
    alive = false;
    visible = false;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerout", onPointerOut);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("blur", onPointerLeave);
    document.removeEventListener("visibilitychange", onVisibility);
    motionPreference.removeEventListener("change", onMotionPreference);
    window.removeEventListener("rerol:menu-activity", onMenuActivity);

    if (ripple) {
      disposeTarget(ripple.read);
      disposeTarget(ripple.write);
    }

    disposeTarget(fieldTarget);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    canvas.remove();
  };

  window.addEventListener("pagehide", destroy, { once: true });
  resize();
}
