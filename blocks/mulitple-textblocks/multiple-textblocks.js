export default function decorate(block) {
  const title = block.children[0].innerText;
  const ul = document.createElement('ul');
  const imageWrapperDiv = block.parentElement;
  const mainHeading = document.createElement('h2');
  mainHeading.textContent = `${title}`;
  imageWrapperDiv.prepend(mainHeading);
  console.log(block, title, mainHeading, imageWrapperDiv);
  console.log(block.children);
  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    if (index > 0) {
      while (row.firstElementChild) {
        li.append(row.firstElementChild);
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
