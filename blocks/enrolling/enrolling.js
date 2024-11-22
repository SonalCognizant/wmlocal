import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  // const backgroundImage = block.children[0].innerText;
  const title = block.children[0].innerText;
  const ul = document.createElement('ul');
  const imageWrapperDiv = block.parentElement;
  // imageWrapperDiv.style.backgroundImage = `url(${backgroundImage})`;
  // imageWrapperDiv.style.backgroundSize = 'cover';
  // imageWrapperDiv.style.backgroundPosition = 'center';
  // imageWrapperDiv.style.backgroundRepeat = 'no-repeat';
  const mainHeading = document.createElement('h3');
  mainHeading.classList.add('enrolling-heading');
  mainHeading.textContent = `${title}`;
  imageWrapperDiv.prepend(mainHeading);
  [...block.children].forEach((row, index) => {
    if (index > 0) {
      const li = document.createElement('li');
      console.log(row.firstElementChild, 'hi');
      while (row.firstElementChild) {
        let count = 0;
        li.append(row.firstElementChild);
        li.classList.add(`${count}-column`);
        [...li.children].forEach((div) => {
          if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
          else div.className = 'cards-card-body';
        });
        count += 1;
        ul.append(li);
      }
    }
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
