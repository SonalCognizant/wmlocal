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
      console.log(row);
      while (row.firstElementChild) {
        let count = 0;
        li.append(row.firstElementChild);
        li.classList.add(`${count}-column`);
        count += 1;
        console.log(count, 'count');
        [...li.children].forEach((div) => {
          div.className = 'cards-card-body';
        });
        ul.append(li);
      }
    }
  });
  block.textContent = '';
  block.append(ul);
}
