import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const parentElement = block.parentElement;
  const ul = document.createElement('ul');
  let title = block.children[0].children[0].children[0].innerText;
  console.log(title);
  console.log(block.children[0].innerText);
  //prepend the title
  const mainHeading = document.createElement("h2");
  mainHeading.classList.add("testimonial-heading");
  mainHeading.textContent = `${title}`;
  parentElement.prepend(mainHeading);
  //append the link
//   let link = block.children[block.children.length - 1].innerText;
//   const hyperLink = document.createElement("a");
//   hyperLink.classList.add("testimonial-link");
//   hyperLink.setAttribute("href","#");
//   hyperLink.textContent = `${link}`;
//   parentElement.append(hyperLink);
//   [...block.children].forEach((row, index) => {
//     if (index < block.children.length-1 && index > 0) {
//       const li = document.createElement('li');
//       while (row.firstElementChild) li.append(row.firstElementChild);
//       [...li.children].forEach((div) => {
//         if (div.children.length === 1 && div.querySelector('picture')) div.className = 'testimonial-image';
//         else div.className = 'testimonial-card';
//       });
//       ul.append(li);
//     }
//   });
//   ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
//   block.textContent = '';
//   block.append(ul);
  
}
