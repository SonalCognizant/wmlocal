/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.textContent = "";
  const footerMain = document.querySelector(".footer-main-wrapper");
  const footerProvider = document.querySelector(".footer-provider-wrapper");
  const footerMedAdv = document.querySelector(".footer-medadv-wrapper");
  if (window.location.pathname.includes("/providers/")) {
    block.append(footerProvider)
  } else if (window.location.pathname.includes("/shop/")) {
    block.append(footerMedAdv)
  } else {
    block.append(footerMain)
  }
}
