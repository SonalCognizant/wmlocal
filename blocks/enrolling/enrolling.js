export default function decorate(block) {
  const title = block.children[0].innerText;
  const ul = document.createElement('ul');
  const imageWrapperDiv = block.parentElement;
  const mainHeading = document.createElement('h3');
  mainHeading.classList.add('enrolling-heading');
  mainHeading.textContent = `${title}`;
  imageWrapperDiv.prepend(mainHeading);
  [...block.children].forEach((row, index) => {
    if (index > 0) {
      const li = document.createElement('li');
      let count = 0;
      li.classList.add(`${count}-column`);
      count += 1;
      console.log(count, 'count');
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
