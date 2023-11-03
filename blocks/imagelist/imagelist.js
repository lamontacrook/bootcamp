import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function getMetadata(name, doc) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...doc.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || '';
}

/**
 * @param {HTMLElement} block The header block element
 */
export default async function decorate(block) {
  const promises = [...block.children].map((div) => {
    const link = div.querySelector('div>div>a');
    const path = link ? link.getAttribute('href') : block.textContent.trim();
    div.setAttribute('data-path', path);
    link.remove();
    return (path && path.startsWith('/')) && fetch(path);
  });

  const lessonsUL = document.createElement('ul');
  Promise.all(promises).then((results) => {
    results.forEach(async (resp) => {
      if (resp.ok) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(await resp.text(), 'text/html');
        const title = getMetadata('og:title', doc);
        const desc = getMetadata('og:description', doc);
        const image = getMetadata('og:image', doc);
        const heroPicture = createOptimizedPicture(image);
        const url = getMetadata('og:url', doc);
        const { pathname } = new URL(url);
        const card = document.createElement('div');
        card.classList.add('card');

        const h2 = document.createElement('h3');
        h2.textContent = title;

        const p = document.createElement('p');
        p.textContent = desc;

        card.appendChild(heroPicture);

        const content = document.createElement('div');
        content.classList.add('content-column');
        content.appendChild(h2);
        content.appendChild(p);

        card.append(content);

        const a = document.createElement('a');
        a.href = doc.querySelector('link').href;
        a.appendChild(card);
        const pathCard = block.querySelector(`[data-path='${pathname}']`);
        if (pathCard) pathCard.appendChild(a);

        const lessonsList = document.createElement('li');
        const lessonsAnchor = document.createElement('a');
        lessonsAnchor.href = doc.querySelector('link').href;
        lessonsAnchor.textContent = title;
        lessonsList.append(lessonsAnchor);
        lessonsUL.append(lessonsList);
      }
    });
    const navigation = document.querySelector('.navigation');
    navigation.innerHTML += '<strong>Lessons</strong>';
    navigation.append(lessonsUL);
  });
}
