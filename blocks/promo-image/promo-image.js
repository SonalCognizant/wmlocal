import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
      if (element.textContent.trim() === element.getAttribute('href')) {
        const ext = getUrlExtension(element.getAttribute('href'));
        return ext && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext.toLowerCase());
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
  decorateExternalImages(main, '//External Image//');
  
  // decorate external images with implicit external image marker
  decorateExternalImages(main);
}
// second way of adding external image is through 
// export function decorateMain(main) {
//     // decorate external images with explicit external image marker
//     decorateExternalImages(main, '//External Image//');
function decorateExternalImages(ele, deliveryMarker) {
    const extImages = ele.querySelectorAll('a');
    extImages.forEach((extImage) => {
      if (isExternalImage(extImage, deliveryMarker)) {
        const extImageSrc = extImage.getAttribute('href');
        const extPicture = createOptimizedPicture(extImageSrc);
  
        /* copy query params from link to img */
        const extImageUrl = new URL(extImageSrc);
        const { searchParams } = extImageUrl;
        extPicture.querySelectorAll('source, img').forEach((child) => {
          if (child.tagName === 'SOURCE') {
            const srcset = child.getAttribute('srcset');
            if (srcset) {
              child.setAttribute('srcset', appendQueryParams(new URL(srcset, extImageSrc), searchParams));
            }
          } else if (child.tagName === 'IMG') {
            const src = child.getAttribute('src');
            if (src) {
              child.setAttribute('src', appendQueryParams(new URL(src, extImageSrc), searchParams));
            }
          }
        });
        extImage.parentNode.replaceChild(extPicture, extImage);
      }
    });
  }
