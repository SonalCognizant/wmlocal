/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.textContent = "";
  const footerMeta = getMetadata('footer');
  console.log(footerMeta)
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  console.log(footerPath)
  const fragment = await loadFragment(footerPath);
  console.log(fragment)
  const footer = document.createElement("div");
  const footerMain = document.querySelector(".footer-main-wrapper");
  const footerProvider = document.querySelector(".footer-provider-wrapper");
  const footerMedAdv = document.querySelector(".footer-medadv-wrapper");
  if (window.location.pathname.includes("/providers/")) {
    footer.append(footerProvider);
  } else if (window.location.pathname.includes("/shop/")) {
    footer.append(footerMedAdv);
  } else {
    footer.append(footerMain);
  }
  block.append(footer);
}