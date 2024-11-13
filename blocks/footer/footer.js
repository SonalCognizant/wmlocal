// /**
//  * loads and decorates the footer
//  * @param {Element} block The footer block element
//  */
// export default async function decorate(block) {
//   // block.textContent = "";
//   // const footerMeta = getMetadata('footer');
//   // const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
//   // const fragment = await loadFragment(footerPath);
//   const footer = document.createElement("div");
//   const footerMain = document.querySelector(".footer-main-wrapper");
//   const footerProvider = document.querySelector(".footer-provider-wrapper");
//   const footerMedAdv = document.querySelector(".footer-medadv-wrapper");
//   if (window.location.pathname.includes("/providers/")) {
//     footer.append(footerProvider);
//   } else if (window.location.pathname.includes("/shop/")) {
//     footer.append(footerMedAdv);
//   } else {
//     footer.append(footerMain);
//   }
//   block.append(footer);
// }
export default async function decorate(block) {
  block.textContent = ""; // Clear the block
 
  // Create a new footer element
  const footer = document.createElement("div");
 
  // Select the footer wrappers
  const footerMain = document.querySelector(".footer-main-wrapper");
  const footerProvider = document.querySelector(".footer-provider-wrapper");
  const footerMedAdv = document.querySelector(".footer-medadv-wrapper");
 
  // Check the current path and append the correct footer
  if (window.location.pathname.includes("/providers/")) {
    if (footerProvider) {
      footer.append(footerProvider.cloneNode(true)); // Clone the node to avoid moving it
    }
  } else if (window.location.pathname.includes("/shop/")) {
    if (footerMedAdv) {
      footer.append(footerMedAdv.cloneNode(true)); // Clone the node to avoid moving it
    }
  } else {
    if (footerMain) {
      footer.append(footerMain.cloneNode(true)); // Clone the node to avoid moving it
    }
  }
 
  // Append the constructed footer to the block
  block.append(footer);
}