export default async function decorate(block) {
  const content = block.querySelectorAll('.hero>div');
  
  let picture = '';
  let contentDiv = document.createElement('div');
  contentDiv.classList.add('content');

  [...content].forEach((div) => {
    if(div.querySelector(':has(picture'))
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