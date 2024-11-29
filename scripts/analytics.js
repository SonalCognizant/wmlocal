/* eslint-env browser */

function callToActionEvent(adobeDataLayer) {
  adobeDataLayer.push({
    event: 'call_to_action',
    eventData: {
      cta_element_type: '',
      cta_click_text: '',
      cta_data_info: '',
      cta_click_image: '',
      cta_location: '',
      cta_type: '',
    },
  });
}

function navigationEvent(adobeDataLayer) {
  adobeDataLayer.push({
    event: 'navigation',
    nav_menu_type: '',
    nav_click_image_alt_text: '',
    nav_click_text: '',
  });
}

function clickEvent(adobeDataLayer, linkStr, event) {
  const linkClasses = Array.from(event.currentTarget.classList).join(' ');
  linkStr.search = '';
  const linkUrl = linkStr.href;
  const linkDomain = linkStr.hostname;
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

function isOutboundLink(linkURL) {
  let outboundLink = false;
  if (!linkURL.hostname) {
    outboundLink = false;
  }
  if (linkURL.hostname !== window.location.hostname) {
    outboundLink = true;
  }
  console.log(linkURL, ' ', outboundLink);
  return outboundLink;
}

function buttonAnalytics(adobeDataLayer) {
  const buttons = document.querySelectorAll('a');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      console.log("anchor clicked");
      const linkHref = event.currentTarget.getAttribute('href');
      const linkURL = new URL(linkHref);
      if (linkHref) {
        if (isOutboundLink(linkURL)) {
          clickEvent(adobeDataLayer, linkURL, event);
        }

        if (button.classList.contains('button')) {
          callToActionEvent(adobeDataLayer);
        } else if (
          !button.classList.contains('button') &&
          !isOutboundLink(linkURL)
        ) {
          navigationEvent(adobeDataLayer);
        }
      }
    });
  });
}

function analyticsMain() {
  document.addEventListener('DOMContentLoaded', () => {
    const adobeDataLayer = window.adobeDataLayer || [];
    buttonAnalytics(adobeDataLayer);
  });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  analyticsMain,
};
