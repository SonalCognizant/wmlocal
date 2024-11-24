export default function decorate(block) {

  const imgIcon = block.querySelector('.button-container');
  const linkImgicon = document.createElement('img');
  linkImgicon.src = '/icons/right-arrow.svg';
  linkImgicon.setAttribute('data-icon-name', 'right-arrow');
  linkImgicon.className = 'link-img';
  imgIcon.append(linkImgicon);
  
  const innerleftDivs = [...block.children].slice(0,1); 
  const blockleft = document.createElement('div');
  blockleft.classList.add('block-left');
  block.prepend(blockleft);
  blockleft.append(innerleftDivs[0]);
  
  const childLength = [...block.children].length;
  const innerrightDivs = [...block.children].slice(1,childLength); 
  const blockRight = document.createElement('div');
  blockRight.classList.add('block-right');
  block.append(blockRight);
  blockRight.append(...innerrightDivs);
}