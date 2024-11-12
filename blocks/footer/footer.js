import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata("footer");
  let footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";
  const fragment = await loadFragment(footerPath);
  block.textContent = "";
  const footer = document.createElement("div");
  console.log(fragment.firstElementChild, "fragmentfirstChild");
  while (fragment.firstElementChild) {
    const footerMain = document.querySelector('.footer-main-wrapper')
    const footerProvider = document.querySelector('.footer-provider-wrapper')
    const footerMedAdv = document.querySelector('.footer-medadv-wrapper')
    console.log(footerMain,footerProvider,footerMedAdv)
    if (window.location.pathname.includes("/providers/")) {
      fragment.firstElementChild(footerProvider)
    } else if (window.location.pathname.includes("/shop/shopplans/")) {
      fragment.firstElementChild(footerMedAdv)
    } else {
      fragment.firstElementChild(footerMain)
    }
    footer.append(fragment.firstElementChild);
  }

  block.append(footer);
}
