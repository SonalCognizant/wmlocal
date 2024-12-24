export default function decorate(block) {
  console.log(block);
  const titleClass = block.children[0].children[0].querySelector('p');
  if (titleClass) {
    titleClass.classList.add('title');
  }
  const descrClass = block.children[0].children[1].querySelector('p');
  if (descrClass) {
    descrClass.classList.add('description');
  }
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('tbnr-maindiv');
  const textContDiv = document.createElement('div');
  textContDiv.classList.add('tbnr-textcont');
  if (titleClass) {
    textContDiv.append(titleClass);
  }
  if (descrClass) {
    textContDiv.append(descrClass);
  }
  mainDiv.append(textContDiv);
  block.innerHTML = '';
  block.append(mainDiv);
}
