# NGC Bootcamp

## Setting up Respository

This tutorial will get you up-and-running with a new AEM Franklin project. In 10 - 20 minutes, you will have created your own site and be able to create, preview, and publish your own content, styling, and add new blocks.

Prerequisites:

1. You have a GitHub account, and understand Git basics.
2. You have a Google account.
3. You understand the basic HTML, CSS, and JavaScript.
4. You have Node/npm installed for local development.

Get Started with the Franklin Boilerplate Repository Template
The fastest and easiest way to get started following AEM Franklin best practices is to create your repo using the Franklin boilerplate GitHub repo as a template.

1. Navigate to the [boilder plate repository](https://github.com/adobe/helix-project-boilerplate).  Click on Use Template > Create New Repository.

![create-template](./assets/use-template.png)

2.  We now need to add the Franklin Bot by clicking [here](https://github.com/apps/helix-bot/installations/new)

In the Repository access settings of the Franklin bot, make sure you select Only select Repositories (not All Repositories). Then select your newly created repo, and click Save.

3. Let's now go to google drive.  We can also use Sharepoint which will be similar setup.  In google drive we want to create an new document and name it `index`.

4. To the document, let's add an image and text.  Open assets and navigate to assets > gql-demo > assets and select and asset and click 'e' to edit. Copy the image to your clipboard and paste into the document.

5. Not let's add some text that will be the overlay on the image.

Explore. Discover. Live.

6. Now let's update `style.css` and add fonts to project.

TBD: How to get fonts?

Import fonts in `lazy-styles.css`.

```
@font-face {
  font-display: block;
  font-family: wknd-icon-font;
  font-style: normal;
  font-weight: 400;
  src: url(./fonts/wknd-icon-font.ttf) format("truetype"), 
    url(./fonts/wknd-icon-font.woff) format("woff"), 
    url(./fonts/wknd-icon-font.svg#wknd-icon-font) format("svg")
}

@font-face {
  font-display: block;
  font-family: adobe-clean-regular;
  font-style: normal;
  font-weight: 400;
  src: url(./fonts/AdobeClean-Regular.ttf) format("truetype")
}

@font-face {
  font-display: block;
  font-family: adobe-clean-light;
  font-style: normal;
  font-weight: 400;
  src: url(./fonts/AdobeClean-Light.ttf) format("truetype")
}

```

In `styles.css` change:

```
  /* fonts */
  --body-font-family: "wknd-icon-font" !important;
  --heading-font-family: adobe-clean-regular, Arial, Helvetica, sans-serif;
```

Now we can update `hero.css` in order to restyle the hero similar to the headless


