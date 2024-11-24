export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  const divClass = document.querySelector('.benefit-blocks');

  const innerleftDivs = [...divClass.children].slice(0,1); 
  const blockleft = document.createElement('div');
  blockleft.classList.add('block-left');
  divClass.prepend(blockleft);
  blockleft.append(innerleftDivs[0]);

  const childLength = [...divClass.children].length;
  const innerrightDivs = [...divClass.children].slice(1,childLength); 
  const blockRight = document.createElement('div');
  blockRight.classList.add('block-right');
  divClass.append(blockRight);
  
  const imgIcon = document.querySelector('.button-container');
  console.log(imgIcon);
  const linkImg = document.createElement('img');
  linkImg.src = '/icons/right-arrow.svg';
  linkImg.setAttribute('data-icon-name', 'right-arrow');
  linkImg.className = 'link-img';
  imgIcon.append(linkImg);

  innerrightDivs.forEach((child) => {
    blockRight.append(child);
  });

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
