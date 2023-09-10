import { loadCSS } from '../../scripts/lib-franklin.js';

async function copyCode(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText;

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  button.innerText = "Code Copied";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
}

const decorate = async (block) => {
  const button = document.createElement('button');
  button.innerText = 'Copy';
  block.appendChild(button);

  button.addEventListener("click", async () => {
    await copyCode(block, button);
  });

  block.append(button);

  const code = block.querySelector('code');
  code.classList.add('language-javascipt');
};

export default decorate;