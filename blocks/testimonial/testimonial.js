import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  console.log(block);
  const ul = document.createElement('ul');
  [...block.children].forEach((row, index) => {
    if (index > 0){
      const li = document.createElement('li');
      while (row.firstElementChild) li.append(row.firstElementChild);
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
        else div.className = 'cards-card-body';
      });
      ul.append(li);
    }
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
  const imageWrapperDiv = block.parentElement;

  let title = block.children[0].innerText;
  const mainHeading = document.createElement("h3");
  mainHeading.classList.add("testimonial-heading");
  mainHeading.textContent = `${title}`;
  imageWrapperDiv.prepend(mainHeading);

  // let link = block.children[1].innerText;
  // const hyperLink = document.createElement("a");
  // hyperLink.classList.add("testimonial-link");
  // hyperLink.textContent = `${link}`;
  // imageWrapperDiv.append(hyperLink);
}
