export function desktopNavigationMarkup(route = '/') {
  return navigationMarkup(route).replaceAll('<details class="nav-group"', '<details name="desktop-navigation" class="nav-group"');
}
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Company', children: [['About Rerol', '/about/'], ['Blog', '/blog/'], ['Gallery', '/gallery/']] },
  { label: 'Products', children: [['All products', '/products/'], ['Furnace oil', '/products/furnace-oil/'], ['LDO', '/products/light-diesel-oil/'], ['Re-refined base oil', '/products/re-refined-base-oil/'], ['Distilled fuel oil (DFO)', '/products/distilled-fuel-oil/']] },
  { label: 'Services', children: [['All services', '/services/'], ['Used Oil Collection', '/services/used-oil-collection/'], ['Quality & Testing', '/services/testing-and-documentation/'], ['Delivery & Logistics', '/services/delivery-and-logistics/'], ['EPR Support', '/services/epr-support/'], ['Cost & Supply Planning', '/services/cost-and-supply-planning/']] },
  { label: 'Industries', href: '/industries/' },
  { label: 'Contact', href: '/contact/' },
];
export function navigationMarkup(route = '/', overlay = false) {
  const link = (label, href, css = '') => `<a ${css ? `class="${css}" ` : ''}href="${href}"${route === href ? ' aria-current="page"' : ''}>${label}</a>`;
  return navigation.map((item, index) => {
    const css = overlay ? 'menu-link' : '';
    const content = item.children
      ? `<details class="nav-group"${item.children.some(([, href]) => route === href) ? ' data-current-group' : ''}><summary class="${css}">${item.label}<span class="nav-chevron" aria-hidden="true">⌄</span></summary><div class="nav-submenu">${item.children.map(([label, href]) => link(label, href)).join('')}</div></details>`
      : link(item.label, item.href, css);
    return overlay ? `<li style="--item-index:${index}">${content}</li>` : content;
  }).join('\n');
}
