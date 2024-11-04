import { createOptimizedPicture } from '../../scripts/aem.js';
export default function decorate(block) {
  /* change to ul, li */
//   console.log(block.children[0].innerHTML,"block");
  let backgroundImage = block.children[0].innerText;
  let title = block.children[1].innerText;
  console.log(block)
  const ul = document.createElement('ul');
  console.log(block.children.length);
  block.children[0]=backgroundImage;
  block.children[1]=title;
    [...block.children[2]].forEach((row) => {
    if(row.length>1){
    const li = document.createElement('li');
    console.log(row.firstElementChild,"row")
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    
    ul.append(li);
}});
  block.children[2]=ul;
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
