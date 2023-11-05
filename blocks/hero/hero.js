export default async function decorate(block) {
  const content = block.querySelectorAll('.hero>div');
  let picture = '';

  /**
   * create a div for title and pre-title
   */
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');

  [...content].forEach((div) => {
    /**
     * check for picture tag
     */
    if (div.querySelector(':has(picture')) picture = div.querySelector(':has(picture');
    else contentDiv.appendChild(div);
  });

  /**
   * define separator
   */
  const span = document.createElement('span');
  span.classList.add('separator');
  contentDiv.insertBefore(span, contentDiv.querySelector('div:nth-child(2)'));
  block.appendChild(contentDiv);
  picture.parentNode.classList.add('image');
}
