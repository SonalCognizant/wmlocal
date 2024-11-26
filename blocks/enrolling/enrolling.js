export default function decorate(block) {
  const title = block.children[0].innerText;
  const ul = document.createElement('ul');
  const imageWrapperDiv = block.parentElement;
  const mainHeading = document.createElement('h3');
  mainHeading.classList.add('enrolling-heading');
  mainHeading.textContent = `${title}`;
  imageWrapperDiv.prepend(mainHeading);
  console.log(block.children.length);
  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    if (block.children.length - 1 === 3) {
      const blockedDiv = document.querySelector('.enrolling-2-column');
      const nextDiv = document.querySelector('cards-card-body');
      console.log(blockedDiv, 'blockedDiv');
      console.log(nextDiv);
    }
    li.classList.add(`enrolling-${index}-column`);
    if (index > 0) {
      while (row.firstElementChild) {
        li.append(row.firstElementChild);
        [...li.children].forEach((div) => {
          div.className = 'cards-card-body';
        });
        ul.append(li);
      }
    }
    console.log(index, 'hello');
  });
  block.textContent = '';
  block.append(ul);
}
