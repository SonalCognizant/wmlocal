export default async function decorate(block) {
//   console.log(block.children[0].textContent);
//   const heading = block.children[0].textContent;
//   const title = document.createElement('h2');
//   title.innerText = heading;
//   block.children[0].innerHTML = title;\
  const div = document.createElement('div');
  [...block.children].forEach((row) => {
    div.append(row);
  });
  block.append(div);
}
