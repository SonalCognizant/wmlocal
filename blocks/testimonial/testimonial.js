import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Get the parent element and create a new unordered list
  const parentElement = block.parentElement;
  const ul = document.createElement('ul');
  // Get the title from the first child and prepend it
  const title = block.children[0].innerText;
  const mainHeading = document.createElement("h2");
  mainHeading.classList.add("testimonial-heading");
  mainHeading.textContent = title;
  parentElement.prepend(mainHeading);
  // Get the link from the last child and append it
  const link = block.children[block.children.length - 1].innerText;
  const hyperLink = document.createElement("a");
  hyperLink.classList.add("testimonial-link");
  hyperLink.setAttribute("href", "#");
  hyperLink.textContent = link;
  parentElement.append(hyperLink);
  // Process the remaining children to create list items
  [...block.children].forEach((row, index) => {
    if (index < block.children.length - 1 && index > 0) {
      const li = document.createElement('li');
      while (row.firstElementChild) li.append(row.firstElementChild);
      // Set class for the list item
      li.className = 'testimonial-card';
      ul.append(li);
    }
  });
  // Clear the original block content and append the new list
  block.textContent = '';
  block.append(ul);
}