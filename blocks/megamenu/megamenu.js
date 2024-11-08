//const menuLinks=[];

function renderMegaMenu(nav) {
  const section1 = document.createElement('div');
  section1.className = 'sec1';
  const section2 = document.createElement('div');
  section2.className = 'sec2';
  section2.createElement('ul');
  //loop through menuLinks json to create li
  nav.append(section1);
  nav.append(section1);
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  renderMegaMenu(nav);
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
