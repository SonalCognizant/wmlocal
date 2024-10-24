export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`image-text-${cols.length}-cols`);

  // setup image image-text
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in image-text
          picWrapper.classList.add('image-text-img-col');
        }
      }
    });
  });
}
