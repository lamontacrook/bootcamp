import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

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

export default async function decorate(block) {
  const content = block.querySelectorAll('.hero.fullscreen>div');

  if (Object.keys(content).length > 0) {
    let picture = '';
    let contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    [...content].forEach((div) => {
      if (div.querySelector(':has(picture'))
        picture = div.querySelector(':has(picture');
      else
        contentDiv.appendChild(div);
    });

    const span = document.createElement('span');
    span.classList.add('seperator');
    contentDiv.insertBefore(span, contentDiv.querySelector('div:nth-child(2)'));

    block.appendChild(contentDiv);
    picture.parentNode.classList.add('image');
  }

  const reference = block.querySelector('.hero.featured a');
  console.log(reference);
  if(reference) {
    console.log(reference.getAttribute('href'));
    const doc = await loadFragment(reference.getAttribute('href'));
    const title = getMetadata('og:title', doc);
    const desc = getMetadata('og:description', doc);
    const preTitle = getMetadata('og:pre-title', doc);
    const image = createOptimizedPicture(doc.querySelector('img').src);

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const p = document.createElement('p');
    p.textContent = desc;

    const contentDiv = reference.parentElement.parentElement;
    contentDiv.classList.add('content');

    contentDiv.removeChild(reference.parentElement);
    contentDiv.appendChild(h3);
    contentDiv.appendChild(p);

    const float = document.createElement('div');
    float.appendChild(contentDiv);
    float.appendChild(image);
    block.appendChild(float);
  }
}
