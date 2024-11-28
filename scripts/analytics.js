/* eslint-env browser */

function buttonAnalytics(adobeDataLayer) {
  const buttons = document.querySelectorAll('.button-container a.button');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const linkClasses = Array.from(event.currentTarget.classList).join(' ');

      const linkHref = event.currentTarget.getAttribute('href');
      const linkStr = new URL(linkHref);
      linkStr.search = '';
      const linkUrl = linkStr.href;
      const linkDomain = linkStr.hostname;
      const linkID = event.currentTarget.getAttribute('id');

      const isOutBound = linkDomain !== window.location.hostname;
      const isOutBoundString = String(isOutBound);
      adobeDataLayer.push({
        event: 'click',
        eventData: {
          link_classes: linkClasses,
          link_domain: linkDomain,
          link_url: linkUrl,
          link_id: linkID || 'undefined',
          outbound: isOutBoundString,
        },
      });
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
