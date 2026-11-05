import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
const source = readFileSync('dist/enquiries.js', 'utf8');
function setup({ accessKey = '00000000-0000-0000-0000-000000000001', response = { ok: true, json: async () => ({ success: true }) }, valid = true, fields = {}, fetcher } = {}) {
  const calls = [];
  const values = { name: 'QA Test', phone: '0000000000', requirement: 'DFO', consent: 'on', ...fields };
  const status = { children: [], replaceChildren(...nodes) { this.children = nodes; }, append(node) { this.children.push(node); }, classList: { toggle() {} } };
  const button = { disabled: false };
  const form = { reportValidity: () => valid, querySelector: selector => selector.includes('status') ? status : button, setAttribute() {}, removeAttribute() {}, addEventListener: (name, handler) => { form.submit = handler; } };
  runInNewContext(source, {
    document: { querySelector: () => ({ content: accessKey }), querySelectorAll: () => [form], createTextNode: text => ({ textContent: text }), createElement: () => ({}) },
    FormData: class { get(name) { return values[name]; } },
    window: { location: { origin: 'https://rerolrefinery.com', pathname: '/contact/', assign: url => calls.push(['navigate', url]) } },
    fetch: async (...args) => { calls.push(['fetch', ...args]); return fetcher ? fetcher(...args) : response; }, AbortController, setTimeout, clearTimeout,
  });
  return { submit: () => form.submit({ preventDefault() {} }), calls, values, status, button };
}
let t = setup(); await t.submit();
assert.deepEqual(t.calls.map(c => c[0]), ['fetch', 'navigate'], 'Save must precede WhatsApp');
assert.equal(JSON.parse(t.calls[0][2].body).requirement, 'DFO');
assert.equal(t.calls[0][1], 'https://api.web3forms.com/submit');
assert.equal(JSON.parse(t.calls[0][2].body).access_key, '00000000-0000-0000-0000-000000000001');
await t.submit(); assert.equal(t.calls.filter(c => c[0] === 'fetch').length, 1, 'Repeated submit must not duplicate accepted enquiry');
for (const response of [{ ok: true, json: async () => ({ success: 'false' }) }, { ok: true, json: async () => ({}) }, { ok: false, json: async () => ({ errors: ['rate limited'] }) }, { ok: true, json: async () => ({ success: false }) }]) {
  t = setup({ response }); await t.submit();
  assert.equal(t.calls.length, 1, 'Unconfirmed submission must not auto-open WhatsApp');
  assert.match(t.status.children[0].textContent, /could not confirm/);
  assert.equal(t.values.name, 'QA Test'); assert.equal(t.button.disabled, false);
}
t = setup({ fetcher: async () => { throw new Error('offline'); } }); await t.submit();
assert.equal(t.calls.length, 1); assert.match(t.status.children[0].textContent, /retry/);
t = setup({ valid: false }); await t.submit(); assert.equal(t.calls.length, 0);
t = setup({ fields: { botcheck: 'on' } }); await t.submit(); assert.equal(t.calls.length, 0);
t = setup({ accessKey: '' }); await t.submit(); assert.deepEqual(t.calls.map(c => c[0]), ['navigate']);
let finish;
t = setup({ fetcher: () => new Promise(resolve => { finish = resolve; }) });
const pending = t.submit(); await t.submit(); assert.equal(t.calls.length, 1); assert.equal(t.button.disabled, true);
finish({ ok: true, json: async () => ({ success: true }) }); await pending; assert.equal(t.button.disabled, false);
console.log('Passed: save-before-navigation, DFO payload, duplicate protection, failed responses, offline recovery, validation, honeypot, unconfigured fallback and in-flight protection. No real enquiries sent.');
