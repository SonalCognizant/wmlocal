export default function decorate(block) {
  const blockChild = block.children[0].children[0];
  const dates = block.children[0].children[0].querySelector('p');
  if (dates) {
    dates.parentElement.classList.add('date');
  }
  setTimeout(() => {
    // Check if block and its children exist
    if (block && block.children && block.children[0] && block.children[0].children[1]) {
      const date = block.children[0].children[1].querySelector('p');
      // Check if date element exists
      if (date) {
        const modifiedDate = window.BlogLastModified;
        // Check if modifiedDate exists
        if (modifiedDate) {
          const spanmodified = document.createElement('span');
          spanmodified.innerHTML = modifiedDate;
          date.append(spanmodified);
          // Check if blockChild exists before appending
          if (blockChild) {
            blockChild.append(date);
          }
        } else {
          const spanNull = document.createElement('span');
          spanNull.innerHTML = 'MM/DD/YYYY';
          date.append(spanNull);
          console.error('window.BlogLastModified is null or undefined');
        }
      } else {
        console.error('Date element not found');
      }
    } else {
      console.error('Block or its children are null or undefined');
    }
  }, 500);
  // setTimeout(() => {
  //   const date = block.children[0].children[1].querySelector('p');
  //   if (date) {
  //     const modifiedDate = window.BlogLastModified;
  //     const spanmodified = document.createElement('span');
  //     spanmodified.innerHTML = modifiedDate;
  //     date.append(spanmodified);
  //     blockChild.append(date);
  //   }
  // }, 500);
  const author = block.children[0].children[2].querySelector('p');
  if (author) {
    author.parentElement.classList.add('author');
  }
  const linkParagraphs = block.children[1].children[0].querySelectorAll('p');
  linkParagraphs.forEach((p) => {
    p.parentElement.classList.add('article-link');
  });
  const audio = block.children[2].children[0].querySelector('p');
  if (audio) {
    audio.parentElement.classList.add('article-audio');
  }
}
