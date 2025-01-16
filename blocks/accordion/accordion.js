/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  const accordionWrapper = [...block.children];
  const accordionSection = accordionWrapper.slice(1, accordionWrapper.length);

  accordionSection.forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
  const { parentElement } = block;
  // get the first child
  const title = block.children[0];
  // remove the first child
  title.remove();
  // Check if the title exists and has non-empty content
  if (title && title.textContent.trim() !== '') {
    // Create the heading element for accordion
    const mainHeading = document.createElement('h2');
    mainHeading.classList.add('accordion-heading');
    mainHeading.textContent = title.textContent.trim(); // Use the trimmed content
    parentElement.prepend(mainHeading);
  }
}
