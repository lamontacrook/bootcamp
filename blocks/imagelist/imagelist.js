
function getMetadata(name, doc) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...doc.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || '';
}

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {Document} The document
 */
async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(path);
    if (resp.ok) {
      const parser = new DOMParser();
      return parser.parseFromString(await resp.text(), 'text/html');
    }
  }
  return null;
}

/**
 * @param {HTMLElement} block The header block element
 */
export default async function decorate(block) {

  [...block.children].forEach(async (div) => {
    const link = div.querySelector('div>div>a');
    const path = link ? link.getAttribute('href') : block.textContent.trim();
    const doc = await loadFragment(path);
    div.remove();

    const heroPicture = doc.querySelector('picture');
    const title = getMetadata('og:title', doc);
    const desc = getMetadata('og:description', doc);

    const card = document.createElement('div');
    card.classList.add('card');

    const h2 = document.createElement('h3');
    h2.textContent = title;

    const p = document.createElement('p');
    p.textContent = desc;

    card.appendChild(heroPicture);
    card.appendChild(h2);
    card.appendChild(p);

    const a = document.createElement('a');  
    a.href = doc.querySelector('link').href;
    a.appendChild(card);

    block.appendChild(a);
  });
}