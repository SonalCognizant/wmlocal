export default function decorate(block) {
  const parentEle = block.parentElement.parentElement;
  parentEle.classList.add('blue-550');
  const image = block.children[0].children[0].children[0].querySelector('img');
  const titleClass = block.children[1].children[0].querySelector('p');
  if (titleClass) {
    titleClass.classList.add('title');
  }
  const descrClass = block.children[1].children[1].querySelector('p');
  if (descrClass) {
    descrClass.classList.add('description');
  }
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('tbnr-maindiv');
  const textContDiv = document.createElement('div');
  textContDiv.classList.add('tbnr-textcont');
  const picDiv = document.createElement('div');
  picDiv.classList.add('tbnr-pic');
  const btnDiv = document.createElement('div');
  btnDiv.classList.add('tbnr-btn');
  // console.log(block);
  const buttons = block.children[2].children[0].innerHTML;
  btnDiv.innerHTML = buttons;
  picDiv.append(image);
  if (titleClass) {
    textContDiv.append(titleClass);
  }
  if (descrClass) {
    textContDiv.append(descrClass);
  }
  textContDiv.append(btnDiv);
  mainDiv.append(textContDiv, picDiv);
  block.innerHTML = '';
  block.append(mainDiv);
}
