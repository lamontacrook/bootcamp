# NGC Bootcamp

## Create Your Own Block

1. Now let's update hero block so that it contains more elements than just an `<h1 />`.

```javascript
export default async function decorate(block) {

}
```

Comment out building auto block in `scripts.js`.

```javascript
function buildAutoBlocks(main) {
  try {
    // buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}
```

Now we are controlling how hero is rendered.

2. Let's now structure the DOM for the block.

```javascript
export default async function decorate(block) {
  const content = block.querySelectorAll('.hero>div');
  
  let picture = '';
  let contentDiv = document.createElement('div');
  contentDiv.classList.add('content');

  [...content].forEach((div) => {
    if(div.querySelector(':has(picture'))
      picture = div.querySelector(':has(picture');
    else {
      contentDiv.appendChild(div);
    }
  });

  block.appendChild(contentDiv);
  picture.parentNode.classList.add('image');
}
```

3. Change CSS. Replace `<h1 />` in the class declaration with `.content`.

```css
main .hero .content {
```

Let's also update the styling for the seperator.

```css
main .hero .content .seperator {
  width: 128px;
  height: 5px;
  display: block;
  content: "";
  background-color: #ffc719;
  transition: width .4s ease-in-out;
  margin: auto;
}
```