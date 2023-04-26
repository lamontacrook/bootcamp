# NGC Bootcamp

## Create Your Own Block

1. Now let's update hero block so that it contains more elements than just an `<h1 />`.  NGC expects that a block defined in the document have a *.js and *.css file in a directory under `/blocks` directory.  All should share the same name.  You will see that there is a `/hero` folder with a javascript and CSS file under.  Open the `hero.js`.

We need to export the `decorate` function for NGC to be able to call.  This will be the entry point for our code. Enter the following code.

```javascript
export default async function decorate(block) {

}
```

In order to avoid NGG trying to load the hero autoblock, comment out building auto block in `scripts.js`.

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

2. Let's now structure the DOM for the block.  We will add a couple of selectors and put the content in a `<div />`.

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
  text-align: center;
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

EXTRA: We can add video support.

