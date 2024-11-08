const navmenu = '["Home", "Shop", "Find care", "Employer"]';
 
function renderMegaMenu(nav) {
  const section1 = document.createElement('div');
  section1.className = 'sec1';
  const section2 = document.createElement('div');
  section2.className = 'sec2';
  const navul = document.createElement('ul');
  navul.className = 'nav-ul';
  // const navli = document.createElement('li');
  // navli.className = 'nav-li';
  section2.append(navul);
  // navul.append(navli);

  nav.append(section1);
  nav.append(section2);
  //Logo path
  const logoImg = document.createElement("img");
  logoImg.src = '../../images/global/WellmarkLogo.png';
  logoImg.setAttribute ('title', 'image');
  logoImg.className = 'logo-img';
  section1.append(logoImg);
  //Search path
  const navright = document.createElement('div');
  navright.className = 'nav-right';
  const search = document.createElement('div');
  search.classList.add('search', 'sidekick-library', 'block');
  const searchbox = document.createElement('div');
  searchbox.className = 'search-box';
  const searchicon = document.createElement('span');
  searchicon.classList.add('icon', 'icon-search');
  const iconImg = document.createElement("img");
  iconImg.src = '../../icons/search.svg';
  iconImg.setAttribute ('title', 'image');
  const searchinput = document.createElement('input');
  searchinput.setAttribute ('type', 'search');
  searchinput.className = 'search-input';
  searchinput.setAttribute ('placeholder', 'Search Wellmark');
  //Button path
  const anchor = document.createElement('a');
  anchor.textContent = 'Log in / Register';
  anchor.setAttribute ('href', '#');
  anchor.setAttribute ('title', 'primary');
  anchor.classList.add('button', 'primary');
 
  section1.append(navright);
  navright.append(search);
  navright.append(anchor);
  search.append(searchbox);
  searchbox.append(searchicon);
  searchicon.append(iconImg);
  searchbox.append(searchinput);
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