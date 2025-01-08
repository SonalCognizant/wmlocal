export default function decorate(block) {
  const blockChild = block.children[0].children[0];
  const dates = block.children[0].children[0].querySelector('p');
  if (dates) {
    dates.parentElement.classList.add('date');
  }
  setTimeout(() => {
    const date = block.children[0].children[1].querySelector('p');
    if (date) {
      const modifiedDate = window.BlogLastModified;
      const spanmodified = document.createElement('span');
      spanmodified.innerHTML = modifiedDate;
      date.append(spanmodified);
      blockChild.append(date);
    }
  }, 500);
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
