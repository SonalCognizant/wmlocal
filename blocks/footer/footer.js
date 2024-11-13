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
  console.log(fragment.firstElementChild,"total");
  console.log(fragment.firstElementChild.children,"total child");
  console.log(fragment.firstElementChild.children.children[0],"footer-main");
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
    const footerMain = document.querySelector(".footer-main-wrapper");
    const footerProvider = document.querySelector(".footer-provider-wrapper");
    const footerMedAdv = document.querySelector(".footer-medadv-wrapper");
    // if (window.location.pathname.includes("/providers/")) {
    //   footer.append(footerProvider);
    // } else if (window.location.pathname.includes("/shop/")) {
    //   footer.append(footerMedAdv);
    // } else {
    //   console.log(footerMain);
    //   footer.append(footerMain);
    // }
  }
  block.append(footer);
}
