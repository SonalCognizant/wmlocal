import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata("footer");
  // let footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  let footerPath;
  // if (window.location.pathname === "/providers/*") {
  //   footerPath = "/providers/provider";
  // } else if (window.location.pathname === "/shop/shopplans/*") {
  //   footerPath = "/shop/shopplans/medicareadvantage";
  // } else {
  //   footerPath = "/footer";
  // }
  if (window.location.pathname.includes("/providers/")) {
    footerPath = "/providers/provider";
  } else if (window.location.pathname.includes("/shop/shopplans/*")) {
    footerPath = "/shop/shopplans/medicareadvantage";
  } else {
    footerPath = "/footer";
  }
  const fragment = await loadFragment(footerPath);

  block.textContent = "";
  const footer = document.createElement("div");
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
