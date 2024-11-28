/* eslint-env browser */

function buttonAnalytics() {
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-container a.button');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const linkClasses = Array.from(e.currentTarget.classList).join(' ');

        const linkHref = e.currentTarget.getAttribute('href');
        const linkStr = new URL(linkHref);
        linkStr.search = '';
        const linkUrl = linkStr.href;
        const linkDomain = linkStr.hostname;
        const linkID = e.currentTarget.getAttribute('id');

        const isOutBound = linkDomain !== window.location.hostname;
        window.adobeDataLayer.push({
          event: 'click',
          eventData: {
            link_classes: linkClasses,
            link_domain: linkDomain,
            link_url: linkUrl,
            link_id: linkID || 'undefined',
            outbound: String(isOutBound),
          },
        });
      });
    });
  });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  buttonAnalytics,
};
