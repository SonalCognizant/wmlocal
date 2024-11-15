export default function decorate(block) {
  block.innerHTML = '';
  const div = document.createElement('div');
  const heading = document.createElement('h2');
  const title = block.children[0].innerContent;
  heading.append(title);
  const paragraph = document.createElement('p');
  const description = block.children[1].innerContent;
  paragraph.append(description);
  const button = block.children[2].innerContent;
  div.append(heading, paragraph, button);
  console.log(div);
  block.innerHTML = '';
  block.append(div);
}
