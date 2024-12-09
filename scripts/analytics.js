/* eslint-env browser */

function isRelativeURL(linkHref) {
  const url = new URL(linkHref, window.location.href);
  return url.origin === window.location.origin;
}

const isOutboundLink = (linkHref) => {
  let outboundLink = false;

  if (isRelativeURL(linkHref)) {
    outboundLink = false;
  } else {
    const linkURL = new URL(linkHref);
    if (linkURL.hostname !== window.location.hostname) {
      outboundLink = true;
    }
  }
  return outboundLink;
};

const callToActionEvent = (linkHref, event) => {
  let ctaElementType = event.target.href;
  if (isOutboundLink(linkHref)) {
    const url = new URL(linkHref, window.location.href);
    ctaElementType = url.href;
  }
  const ctaClickText = event.target.innerText || event.currentTarget.text;
  const ctaLocation = window.location.href;
  const ctaType = 'button';
  const ctaDataInfo = '';
  const ctaClickImageAltTxt = '';
  window.adobeDataLayer.reset();
  window.adobeDataLayer.push({
    event: 'call_to_action',
    eventData: {
      cta_element_type: ctaElementType,
      cta_click_text: ctaClickText,
      cta_data_info: ctaDataInfo,
      cta_click_image_alt_text: ctaClickImageAltTxt,
      cta_location: ctaLocation,
      cta_type: ctaType,
      /* nav_menu_type: null,
      nav_click_image_alt_text: null,
      nav_click_text: null,
      link_classes: null,
      link_domain: null,
      link_url: null,
      link_id: null,
      outbound: null, */
    },
  });
};

function navigationEvent(linkHref, event) {
  const navClickText = event.target.innerText || event.currentTarget.text;
  window.adobeDataLayer.reset();
  window.adobeDataLayer.push({
    event: 'navigation',
    eventData: {
      nav_menu_type: 'link',
      nav_click_image_alt_text: '',
      nav_click_text: navClickText,
      /*  link_classes: null,
      link_domain: null,
      link_url: null,
      link_id: null,
      outbound: null,
      cta_element_type: null,
      cta_click_text: null,
      cta_data_info: null,
      cta_click_image_alt_text: null,
      cta_location: null,
      cta_type: null, */
    },
  });
}

function clickEvent(linkHref, event) {
  const linkClasses = Array.from(event.currentTarget.classList).join(' ');
  const linkURL = new URL(linkHref);
  const linkUrl = linkURL.href;
  const linkDomain = linkURL.hostname;
  const linkID = event.currentTarget.getAttribute('id');
  window.adobeDataLayer.reset();
  window.adobeDataLayer.push({
    event: 'click',
    eventData: {
      link_classes: linkClasses,
      link_domain: linkDomain,
      link_url: linkUrl,
      link_id: linkID || 'undefined',
      outbound: 'true',
      /* nav_menu_type: null,
      nav_click_image_alt_text: null,
      nav_click_text: null,
      cta_element_type: null,
      cta_click_text: null,
      cta_data_info: null,
      cta_click_image_alt_text: null,
      cta_location: null,
      cta_type: null, */
    },
  });
}

function buttonAnalytics() {
  const buttons = document.querySelectorAll('a');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const linkHref = event.currentTarget.getAttribute('href');
      if (linkHref) {
        if (isOutboundLink(linkHref)) {
          clickEvent(linkHref, event);
        } else if (
          !isOutboundLink(linkHref)
          && button.classList.contains('button')
        ) {
          callToActionEvent(linkHref, event);
        } else if (
          !button.classList.contains('button')
          && !isOutboundLink(linkHref)
        ) {
          navigationEvent(linkHref, event);
        }
      }
    });
  });
}

function analyticsMain() {
  buttonAnalytics();
}

export {
  // test
  // eslint-disable-next-line import/prefer-default-export
  analyticsMain,
};
