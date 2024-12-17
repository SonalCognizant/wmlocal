export default function decorate(block) {
  const { parentElement } = block.parentElement;
  parentElement.classList.add('blue-550');
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const firstElementDiv = block.firstElementChild;
  firstElementDiv.classList.add('content-block');
  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          const parentofImg = picWrapper.parentElement;
          const parentDiv = document.createElement('div');
          parentDiv.classList.add('columns-img-col');
          parentofImg.append(parentDiv);
          parentDiv.append(pic);
        }
      }
    });
  });
}
