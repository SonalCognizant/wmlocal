import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";
/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
// export default async function decorate(block) {
//   block.textContent = "";
//   const footerMeta = getMetadata('footer');
//   console.log(footerMeta)
//   const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
//   console.log(footerPath)
//   const fragment = await loadFragment(footerPath);
//   console.log(fragment)
//   const footer = document.createElement("div");
//   const footerMain = document.querySelector(".footer-main-wrapper");
//   // console.log(footerMain,"footer-main");
//   const footerProvider = document.querySelector(".footer-provider-wrapper");
//   // console.log(footerProvider,"footer-provider");
//   const footerMedAdv = document.querySelector(".footer-medadv-wrapper");
//   console.log(footerMedAdv,"footer-medAdv");
//   if (window.location.pathname.includes("/providers/")) {
//     footer.append(footerProvider);
//   } else if (window.location.pathname.includes("/shop/")) {
//     footer.append(footerMedAdv);
//   } else {
//     console.log(footerMain);
//     footer.append(footerMain);
//   }
//   block.append(footer);
// }

// import { getMetadata } from '../../scripts/aem.js';
// import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = "";
  const footer = document.createElement("div");
  while (fragment.firstElementChild) {
    const footerMain = fragment.firstElementChild.children[0]
    const footerProvider = fragment.firstElementChild.children[1];
    const footerMedAdv = fragment.firstElementChild.children[2];
    console.log(footerMain,footerProvider,footerMedAdv);
    if (window.location.pathname.includes("/providers/")) {
      footer.append(footerProvider);
    } else if (window.location.pathname.includes("/shop/")) {
      footer.append(footerMedAdv);
    } else {
      footer.append(footerMain);
    }
  }
  block.append(footer);
}
