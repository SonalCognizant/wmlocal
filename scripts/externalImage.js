function appendQueryParams(url, params) {
  const { searchParams } = url;
  params.forEach((value, key) => {
    searchParams.set(key, value);
  });
  url.search = searchParams.toString();
  return url.toString();
}
export function createOptimizedPicture(
  src,
  alt = '',
  eager = false,
  breakpoints = [
    { media: '(min-width: 600px)', width: '2000' },
    { width: '750' },
  ],
) {
  const isAbsoluteUrl = /^https?:\/\//i.test(src);

  // Fallback to createOptimizedPicture if src is not an absolute URL
  if (!isAbsoluteUrl) {
    // eslint-disable-next-line no-undef
    return libCreateOptimizedPicture(src, alt, eager, breakpoints);
  }

  const url = new URL(src);
  const picture = document.createElement('picture');
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    const searchParams = new URLSearchParams({
      width: br.width,
      format: 'webply',
    });
    source.setAttribute('srcset', appendQueryParams(url, searchParams));
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    const searchParams = new URLSearchParams({ width: br.width, format: ext });

    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', appendQueryParams(url, searchParams));
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', appendQueryParams(url, searchParams));
    }
  });

  return picture;
}

function getUrlExtension(url) {
  const extensionValid = url.split(/[#?]/)[0].split('.').pop().trim();
  const geturlvalid = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extensionValid.toLowerCase());
  let setreturn = '';
  if (geturlvalid) {
    setreturn = url.split(/[#?]/)[0].split('.').pop().trim();
  } else {
    const aaidURL = url.split(/[:]/);
    if (aaidURL.includes('aaid')) {
      setreturn = 'aaid';
    }
  }
  return setreturn;
}
function returnExtension(element) {
  const ext = getUrlExtension(element.getAttribute('href'));
  const extensionvalidation = ext === 'aaid' ? true : ext
    && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext.toLowerCase());
  return { isVisible: extensionvalidation, isaaid: extensionvalidation };
}
// eslint-disable-next-line consistent-return
function isExternalImage(element, externalImageMarker) {
  // if the element is not an anchor, it's not an external image
  if (element.tagName !== 'A') return { isVisible: false, isaaid: false };

  if (element.textContent.trim() === externalImageMarker) {
    return { isVisible: true, isaaid: false };
  }
  return returnExtension(element);
}
export function decorateExternalImages(ele, deliveryMarker) {
  const extImages = ele.querySelectorAll('a');
  extImages.forEach((extImage) => {
    const externalImgvalidate = isExternalImage(extImage, deliveryMarker);
    if (externalImgvalidate.isVisible) {
      const extImageSrc = extImage.getAttribute('href');
      const extPicture = createOptimizedPicture(extImageSrc);
      /* copy query params from link to img */
      const extImageUrl = new URL(extImageSrc);
      const { searchParams } = extImageUrl;
      extPicture.querySelectorAll('source, img').forEach((child) => {
        if (child.tagName === 'SOURCE') {
          const srcset = child.getAttribute('srcset');
          if (srcset) {
            child.setAttribute(
              'srcset',
              `${externalImgvalidate.isaaid ? extImageSrc : appendQueryParams(new URL(srcset, extImageSrc), searchParams)}`,
              // appendQueryParams(new URL(srcset, extImageSrc), searchParams),
              // extImageSrc
            );
          }
        } else if (child.tagName === 'IMG') {
          const src = child.getAttribute('src');
          if (src) {
            child.setAttribute(
              'src',
              `${externalImgvalidate.isaaid ? extImageSrc : appendQueryParams(new URL(src, extImageSrc), searchParams)}`,
              // appendQueryParams(new URL(src, extImageSrc), searchParams),
              // extImageSrc
            );
          }
        }
      });
      extImage.parentNode.replaceChild(extPicture, extImage);
    }
  });
}
