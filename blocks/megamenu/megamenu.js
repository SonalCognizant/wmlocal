//const menuLinks=[];

function renderMegaMenu() {
  return '<ul><li>Hello Hello</li></ul>';
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.append(renderMegaMenu());
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
