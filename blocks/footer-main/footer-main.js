import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import {logo} from "../../images/footer-main/WellmarkLogo.png"
/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  console.log(logo);
  const footerMain= block.children[1].classList.add("contact-div");
  console.log(footerMain);
  // load footer as fragment
  // console.log(block);
  // [...block.children].forEach((row, index) => {
  //     const li = document.createElement("li");
  //     while (row.firstElementChild) li.append(row.firstElementChild);
  //     ul.append(li);
  // });
  // const footerMeta = getMetadata('footer');
  // const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  // const fragment = await loadFragment(footerPath);

  // // decorate footer DOM
  // block.textContent = '';
  // const footer = document.createElement('div');
  // while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  return block
}
