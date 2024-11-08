/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  console.log("check");
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.classList.add('accordion-item-label');
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.classList.add('accordion-item-body');
    console.log("empty");
    // decorate accordion item
    const details = document.createElement('details');
    details.classList.add('accordion-item');
    details.append(summary, body);
    row.replaceWith(details);
  });
}
