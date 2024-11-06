import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default function decorate(block) {
  // load footer as fragment
  console.log(block);
  [...block.children].forEach((row, index) => {
      const li = document.createElement("li");
      while (row.firstElementChild) li.append(row.firstElementChild);
      ul.append(li);
  });
}
