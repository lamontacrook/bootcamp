import { decorateIcons, getMetadata } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta).pathname : '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);

  // fetch footer content
  // const footerPath = cfg.footer || '/footer';
  // const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);
    block.append(footer);
  }
}
