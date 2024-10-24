export default function decorate(block) {
    // Hero block is rendered by script.js buildHeroBlock.
    // The buildHeroBlock takes the first div and check if it contains all needed
    // elements (pictures, h1, ...) and then render the auto hero block.
    // In case when extra classes (variants) are needed the auto block can't be used,
    // so the block needs to be added manually.
    // The auto block will grab all the content of the manually added block,
    // so the empty block should be removed.
    if (block.innerText.trim() === '') {
      block.remove();
    }
    buildHeroBlock()
  }
  function buildHeroBlock(main) {
    // switching off hero autoblock for redesign
    if (document.querySelector('main').classList.contains('redesign-v2')) {
      return;
    }
  
    // don't create a hero if the first item is a block, except hero block
    const firstSection = main.querySelector('div');
    if (!firstSection) return;
    const firstElement = firstSection.firstElementChild;
    if (firstElement.tagName === 'DIV' && firstElement.classList.length && !firstElement.classList.contains('hero')) return;
  
    const h1 = firstSection.querySelector('h1');
    const picture = firstSection.querySelector('picture');
    let ctaLink = firstSection.querySelector('a');
    let video = null;
  
    // eslint-disable-next-line no-use-before-define
    if (ctaLink && isLowResolutionVideoUrl(ctaLink.getAttribute('href'))) {
      const videoTemp = `
        <video muted loop class="hero-video">
          <source src="${ctaLink.getAttribute('href')}" type="video/mp4"></source>
        </video>
      `;
  
      const videoWrapper = document.createElement('div');
      videoWrapper.innerHTML = videoTemp;
      video = videoWrapper.querySelector('video');
      ctaLink.parentElement.remove();
      ctaLink = firstSection.querySelector('a');
  
      // adding video with delay to not affect page loading time
      setTimeout(() => {
        picture.replaceWith(video);
        video.play();
      }, 3000);
    }
  
    // check if the previous element or the previous of that is an h1
    const isCTALink = ctaLink && isCTALinkCheck(ctaLink);
    if (isCTALink) ctaLink.classList.add('cta');
    // eslint-disable-next-line no-bitwise
    if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
      const headings = createElement('div', { classes: 'hero-headings' });
      const elems = [picture, headings];
      if (h1.nextElementSibling && (h1.nextElementSibling.matches('h2,h3,h4')
        // also consider a <p> without any children as sub heading except BR
        || (h1.nextElementSibling.matches('p') && ![...h1.nextElementSibling.children].filter((el) => el.tagName !== 'BR').length))) {
        const h4 = document.createElement('h4');
        h4.innerHTML = h1.nextElementSibling.innerHTML;
        h1.nextElementSibling.remove();
        headings.appendChild(h4);
      }
      headings.appendChild(h1);
      if (isCTALink) headings.appendChild(getCTAContainer(ctaLink));
      const section = document.createElement('div');
      const newHeroBlock = buildBlock('hero', { elems });
      newHeroBlock.classList.add(...firstElement.classList);
      section.append(newHeroBlock);
      // remove the empty pre-section to avoid decorate it as empty section
      const containerChildren = firstSection.children;
      const wrapperChildren = containerChildren[0].children;
      if (containerChildren.length <= 1 && wrapperChildren.length === 0) firstSection.remove();
      else if (wrapperChildren.length === 0) containerChildren[0].remove();
  
      if (video) {
        section.querySelector('.hero')?.classList.add('hero-with-video');
      }
  
      // after all are settled, the new section can be added
      main.prepend(section);
    }
  }