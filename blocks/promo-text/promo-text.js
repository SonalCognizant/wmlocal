export default function decorate(block) {
  const title = block.children[0].textContent;
  const description = block.children[1].textContent;
  const button = block.children[2].children[0].children[0];
  button.classList.add('button-container');
  console.log(title, description, button);
  const div = document.createElement('div');
  const heading = document.createElement('h2');
  heading.append(title);
  heading.classList.add('title');
  const paragraph = document.createElement('p');
  paragraph.classList.add('description');
  paragraph.append(description);
  div.append(heading, paragraph, button);
  console.log(div);
  block.innerHTML = '';
  block.append(div);
}
