export default function decorate(block) {
  const div = document.createElement('div');
  [...block.children].forEach((row, index) => {
    if (index > 0) {
      while (row.firstElementChild) div.append(row.firstElementChild);
    }
  });
  block.append(div);
}
