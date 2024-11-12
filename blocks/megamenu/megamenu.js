const navmenu = JSON.stringify([
  {
    title: 'Home',
  },
  {
    title: 'Shop',
    FindCare: ['Find care', 'Over view', 'Medicare', 'Affordable Care Act'],
    Member: ['Member find care', 'Member care options', 'Mental health solutions', 'Virtual care'],
    '': ['BeWell 24/7', 'Case management', 'Preventative services'],
  },
  {
    title: 'Find care',
    subMenu: ['Member view', 'member', 'Act'],
  },
  {
    title: 'Members',
    subMenu: [],
  },
  {
    title: 'Employer',
    subMenu: [],
  },
  {
    title: 'Providers',
    subMenu: [],
  },
  {
    title: 'Producers',
    subMenu: [],
  }]);

function renderMegaMenu(nav) {
  const section1 = document.createElement('div');
  section1.className = 'navbar-brand';
  const section2 = document.createElement('div');
  section2.className = 'navbar-menu';
  const navbarul = document.createElement('ul');
  navbarul.className = 'navbar-ul';
  const menuItems = JSON.parse(navmenu);

  menuItems.forEach((item) => {
    const navbarli = document.createElement('li');
    const navbaranchor = document.createElement('a');
    navbarli.className = 'navbar-li';

    navbaranchor.setAttribute('href', '#');
    navbaranchor.innerText = item.title;
    const submenuwrapper = document.createElement('div');
    submenuwrapper.className = 'submenu-wrapper';

    const submenuul0 = document.createElement('ul');
    submenuul0.className = 'submenu-ul0';
    
    const submenuul1 = document.createElement('ul');
    submenuul1.className = 'submenu-ul1';
    const submenuul2 = document.createElement('ul');
    submenuul2.className = 'submenu-ul2';
    const submenuleft = document.createElement('div');
    submenuleft.className = 'submenu-left';
    const submenuright = document.createElement('div');
    submenuright.className = 'submenu-right';

    navbarul.appendChild(navbarli);
    navbarli.appendChild(navbaranchor);
    navbarli.appendChild(submenuwrapper);
    submenuleft.appendChild(submenuul0);
    submenuleft.appendChild(submenuul1);
    submenuleft.appendChild(submenuul2);
    submenuwrapper.appendChild(submenuleft);
    submenuwrapper.appendChild(submenuright);
  });

  nav.append(section1);
  section2.appendChild(navbarul);
  nav.append(section2);

  // Logo path
  const logoImg = document.createElement('img');
  logoImg.src = '../../images/global/WellmarkLogo.png';
  logoImg.setAttribute('title', 'image');
  logoImg.className = 'navbar-logo';
  section1.append(logoImg);

  // Search path
  const navright = document.createElement('div');
  navright.className = 'nav-right';
  const search = document.createElement('div');
  search.classList.add('navbar-search');
  const searchbox = document.createElement('div');
  searchbox.className = 'navbar-search-box';
  const searchicon = document.createElement('span');
  searchicon.classList.add('icon', 'icon-search');
  const iconImg = document.createElement('img');
  iconImg.src = '../../icons/search.svg';
  iconImg.setAttribute('title', 'image');
  const searchinput = document.createElement('input');
  searchinput.setAttribute('type', 'search');
  searchinput.className = 'search-input';
  searchinput.setAttribute('placeholder', 'Search Wellmark');

  // Button path
  const anchor = document.createElement('a');
  anchor.textContent = 'Log in / Register';
  anchor.setAttribute('href', '#');
  anchor.setAttribute('title', 'primary');
  anchor.classList.add('button', 'primary');

  // Append elements
  section1.append(navright);
  navright.append(search);
  navright.append(anchor);
  search.append(searchbox);
  searchbox.append(searchicon);
  searchicon.append(iconImg);
  searchbox.append(searchinput);
}

/**
* Loads and decorates the header, mainly the nav
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
