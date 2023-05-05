# NGC Bootcamp

## Create Your Own Block

1. We now need to update the document by structuring the document.  Add a table with 1 column and 4 rows.  Into the first row type in hero.  Cut and paste the image into the second line.  Into the 3rd and 4th we want to have our title and add a tagline in the last row.

<h2>Join us for your next adventures.</h2>  

Change the style for this row to Heading 2.

![hero-block](./assets/update-hero-block.png)

2. Now let's update the code for the hero block so that it contains more elements than just an `<h1 />`.  NGC expects that a block defined in the document have a *.js and *.css file in a directory under `/blocks` directory.  You need to ensure that the name for the files and directory all match to what is in the first line of the document.  You will see that there is a `/hero` folder with a javascript and CSS file under.  Open the `hero.js`.

We need to export the `decorate` function for NGC to be able to call.  This will be the entry point for our code. Enter the following code.

```javascript
export default async function decorate(block) {

}
```

In order to avoid NGG trying to load the hero autoblock, add the following line in `scripts.js` to check to see if its already defined in the document.

```javascript
function buildHeroBlock(main) {
  if(main.querySelector('.hero')) return;  //check to see if block is defined

```

Now we are controlling how hero is rendered.

3. Let's now structure the DOM for the block.  We will add a couple of selectors and put the content in a `<div />`.

```javascript
export default async function decorate(block) {
  const content = block.querySelectorAll('.hero>div');
  
  let picture = '';

  /**
   * create a div for title and pre-title
   */
  let contentDiv = document.createElement('div');
  contentDiv.classList.add('content');

  [...content].forEach((div) => {
    /**
     * check for picture tag
     */
    if(div.querySelector(':has(picture'))
      picture = div.querySelector(':has(picture');
    else 
      contentDiv.appendChild(div);
  });

  /**
   * define seperator
   */
  const span = document.createElement('span');
  span.classList.add('seperator');
  contentDiv.insertBefore(span, contentDiv.querySelector('div:nth-child(2)'));
  
  block.appendChild(contentDiv);
  picture.parentNode.classList.add('image');
}
```

4. Change CSS. Replace `h1` in the class declaration with `.content` on line 17 and align the text to center.

```css
main .hero .content {
  text-align: center;
```

Let's also update the styling for the seperator by adding to your CSS file.

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

