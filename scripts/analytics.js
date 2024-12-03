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

const callToActionEvent = (adobeDataLayer, linkHref, event) => {
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

  adobeDataLayer.push({
    event: 'call_to_action',
    eventData: {
      cta_element_type: ctaElementType,
      cta_click_text: ctaClickText,
      cta_data_info: ctaDataInfo,
      cta_click_image_alt_text: ctaClickImageAltTxt,
      cta_location: ctaLocation,
      cta_type: ctaType,
    },
  });
};

function navigationEvent(adobeDataLayer, linkHref, event) {
  const navClickText = event.target.innerText || event.currentTarget.text;
  adobeDataLayer.push({
    event: 'navigation',
    nav_menu_type: 'link',
    nav_click_image_alt_text: '',
    nav_click_text: navClickText,
  });
}

function clickEvent(adobeDataLayer, linkHref, event) {
  const linkClasses = Array.from(event.currentTarget.classList).join(' ');
  const linkURL = new URL(linkHref);
  const linkUrl = linkURL.href;
  const linkDomain = linkURL.hostname;
  const linkID = event.currentTarget.getAttribute('id');
  adobeDataLayer.push({
    event: 'click',
    eventData: {
      link_classes: linkClasses,
      link_domain: linkDomain,
      link_url: linkUrl,
      link_id: linkID || 'undefined',
      outbound: 'yes',
    },
  });
}

function buttonAnalytics(adobeDataLayer) {
  const buttons = document.querySelectorAll('a');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const linkHref = event.currentTarget.getAttribute('href');
      if (linkHref) {
        if (isOutboundLink(linkHref)) {
          clickEvent(adobeDataLayer, linkHref, event);
        }

        if (button.classList.contains('button')) {
          callToActionEvent(adobeDataLayer, linkHref, event);
        } else if (
          !button.classList.contains('button')
          && !isOutboundLink(linkHref)
        ) {
          navigationEvent(adobeDataLayer, linkHref, event);
        }
      }
    });
  });
}

function analyticsMain() {
  const adobeDataLayer = window.adobeDataLayer || [];
  buttonAnalytics(adobeDataLayer);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  analyticsMain,
};
