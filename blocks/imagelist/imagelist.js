
function getMetadata(name, doc) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...doc.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || '';
}

function getHeroImage(doc) {
  console.log(doc);
  const hero = doc.querySelector('div.hero');
  console.log(hero);
  const picture = hero.querySelector('div>div>picture');
  console.log(picture);
}

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {Document} The document
 */
async function loadFragment(path) {
  console.log(path);
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

  let promises = [];
  [...block.children].forEach((div) => {
    const link = div.querySelector('div>div>a');
    const path = link ? link.getAttribute('href') : block.textContent.trim();
    promises.push(loadFragment(path));
    div.remove();
  });

  Promise.all(promises).then((docs) => {
    docs.forEach((doc) => {
      console.log(getHeroImage(doc));
      const title = getMetadata('og:title', doc);
      const desc = getMetadata('og:description', doc);

      const div = document.createElement('div');
      div.classList.add('card');

      const h2 = document.createElement('h3');
      h2.textContent = title;

      const p = document.createElement('p');
      p.textContent = desc;

      div.appendChild(h2);
      div.appendChild(p);

      block.appendChild(div);
    })
  });

  // const link = block.querySelector('a');
  // const path = link ? link.getAttribute('href') : block.textContent.trim();
  // const doc = await loadFragment(path);
  // if (!doc) {
  //   return;
  // }
  // // find metadata
  // const title = getMetadata('og:title', doc);
  // const desc = getMetadata('og:description', doc);

  // const $pre = document.createElement('p');
  // $pre.classList.add('pretitle');
  // $pre.textContent = 'Featured Article';

  // const $h2 = document.createElement('h2');
  // $h2.textContent = title;

  // const $p = document.createElement('p');
  // $p.textContent = desc;

  // const $link = document.createElement('div');
  // $link.append(link);
  // link.textContent = 'Read More';

  // const $text = document.createElement('div');
  // $text.classList.add('text');
  // $text.append($pre, $h2, $p, $link);

  // const $image = document.createElement('div');
  // $image.classList.add('image');
  // // find image
  // const $hero = doc.querySelector('body > main picture');
  // if ($hero) {
  //   $image.append($hero);
  // }

  // block.replaceChildren($image, $text);
}