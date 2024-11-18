const navmenu = JSON.stringify([
  {
    title: 'Home', href: '#',
  },
  {
    title: 'Shop',
    href: '#',
    children: [
      {
        title: 'Shop plans',
        subChildren: [
          { title: 'Medicare Advantage', href: '#' },
          { title: 'Medicare Supplement', href: '#' },
          { title: 'Individual and Family', href: '#' },
          { title: 'Explore all plans', href: '#' },
        ],
      },
      {
        title: 'Business plans',
        subChildren: [
          { title: 'Small group employer', href: '#' },
          { title: 'Mid-size employer', href: '#' },
          { title: 'Large employer', href: '#' },
        ],
      },
      {
        title: 'Understanding plans',
        subChildren: [
          { title: 'Be well 24/7', href: '#' },
          { title: 'Case Management', href: '#' },
          { title: 'Preventative services', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Find care',
    href: '#',
    children: [
      {
        title: 'Find Care',
        subChildren: [
          { title: 'Overview', href: '#' },
          { title: 'Medicare', href: '#' },
          { title: 'Affordable Care Act', href: '#' },
        ],
      },
      {
        title: 'Member Find care',
        subChildren: [
          { title: 'Member care options', href: '#' },
          { title: 'Mental health solutions', href: '#' },
          { title: 'Virtual care', href: '#' },
        ],
      },
      {
        title: 'Additional Resources',
        subChildren: [
          { title: 'Be well 24/7', href: '#' },
          { title: 'Case Management', href: '#' },
          { title: 'Preventative services', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Members', href: '#',
  },
  {
    title: 'Employer', href: '#',
  },
  {
    title: 'Providers', href: '#',
  },
  {
    title: 'Producers', href: '#',
  },
]);

// Menu bar onclick event
function toggleMenu(e) {
  const menuBarlist = e.target.closest('.collapse-bar');
  menuBarlist.classList.toggle('active');
  const mymenu = document.querySelector('.main-header-menu');
  mymenu.classList.toggle('active');
}
function toggleMegaMenu() {
  const menuBar = document.querySelector('.collapse-bar');
  menuBar.addEventListener('click', toggleMenu);
}

// Search bar onclick event
function toggleSearch(e) {
  const menuBarlist = e.target.closest('.search-bar');
  menuBarlist.classList.toggle('active');
}
function toggleSearchBar() {
  const menuBar = document.querySelector('.search-bar');
  menuBar.addEventListener('click', toggleSearch);
}

function renderMegaMenu(nav) {
  const mainheader = document.createElement('div');
  mainheader.className = 'main-header';
  const mainheadernav = document.createElement('div');
  mainheadernav.className = 'main-header-nav';
  const mainheadermenu = document.createElement('div');
  mainheadermenu.className = 'main-header-menu';
  const menublock = document.createElement('div');
  menublock.className = 'menu-block';
  const menuul = document.createElement('ul');
  menuul.className = 'menu-ul';
  const menuItems = JSON.parse(navmenu);
  // Menu bar view
  menuItems.forEach((item) => {
    const menuli = document.createElement('li');
    menuli.className = 'menu-li';
    const spanli = document.createElement('div');
    spanli.className = 'li-span';
    menuli.prepend(spanli);
    const navbaranchor = document.createElement('a');
    navbaranchor.setAttribute('href', item.href);
    navbaranchor.innerText = item.title;

    // Active menu
    navbaranchor.addEventListener('click', () => {
      const anchoractive = document.querySelectorAll('.menu-li a');
      anchoractive.forEach((anchor) => {
        anchor.classList.remove('menu-active');
      });
      navbaranchor.classList.add('menu-active');
    });
    spanli.append(navbaranchor);

    // View menu list
    if (item.children) {
      const menuspan = document.createElement('span');
      menuspan.className = 'menu-span';
      const menuuparrow = document.createElement('img');
      menuuparrow.className = 'menu-up-arrow';
      menuuparrow.src = '../../icons/up-arrow.svg';
      menuuparrow.setAttribute('title', 'image');
      const menudownarrow = document.createElement('img');
      menudownarrow.className = 'menu-down-arrow';
      menudownarrow.src = '../../icons/down-arrow.svg';
      menudownarrow.setAttribute('title', 'image');

      menuspan.appendChild(menuuparrow);
      menuspan.appendChild(menudownarrow);
      spanli.appendChild(menuspan);
      // View submenu list
      const menuitem = document.createElement('div');
      menuitem.className = 'menu-item';
      const menusubmenuul = document.createElement('div');
      menusubmenuul.className = 'menu-submenu-ul';
      navbaranchor.appendChild(menuitem);

      item.children.forEach((child) => {
        const submenuli = document.createElement('ul');
        const title = document.createElement('h4');
        title.append(child.title);
        submenuli.append(title);
        menusubmenuul.append(submenuli);
        if (child.subChildren) {
          child.subChildren.forEach((subchild) => {
            const submenuchild = document.createElement('li');
            const submenuanchor = document.createElement('a');
            submenuanchor.setAttribute('href', subchild.href);
            submenuanchor.append(subchild.title);
            submenuli.append(submenuchild);
            submenuchild.append(submenuanchor);
          });
        }
      });
      const menusubmenulist = document.createElement('div');
      menusubmenulist.className = 'menu-submenu-list';
      const menusubmenucontent = document.createElement('div');
      menusubmenucontent.className = 'menu-submenu-content';
      menuitem.appendChild(menusubmenulist);
      menusubmenulist.appendChild(menusubmenuul);
      menuitem.appendChild(menusubmenucontent);
      menuli.appendChild(menuitem);
    }

    menuul.appendChild(menuli);
  });

  nav.append(mainheader);
  mainheadermenu.appendChild(menublock);
  nav.append(mainheadermenu);
  mainheader.append(mainheadernav);
  menublock.append(menuul);

  // Logo path
  const logoImg = document.createElement('img');
  logoImg.src = '../../images/global/header-logo.png';
  logoImg.setAttribute('title', 'image');
  logoImg.className = 'navbar-logo';
  mainheadernav.append(logoImg);

  // Search path
  const mainheaderright = document.createElement('div');
  mainheaderright.className = 'main-header-right';
  const headersearch = document.createElement('div');
  headersearch.classList.add('main-header-search');
  const headersearchbox = document.createElement('div');
  headersearchbox.className = 'main-header-search-box';
  const headersearchicon = document.createElement('span');
  headersearchicon.classList.add('main-header-search-icon');
  const searchanchor = document.createElement('a');
  searchanchor.classList.add('search-anchor');
  searchanchor.setAttribute('href', '#');
  searchanchor.setAttribute('title', 'search');
  const iconImg = document.createElement('img');
  iconImg.src = '../../icons/search-icon.svg';
  iconImg.setAttribute('title', 'image');
  const searchinput = document.createElement('input');
  searchinput.setAttribute('type', 'search');
  searchinput.className = 'search-input';
  searchinput.setAttribute('placeholder', 'Search Wellmark');
  const btnicon = document.createElement('img');
  btnicon.classList.add('main-header-login-icon');
  btnicon.src = '../../icons/login-btn.svg';
  btnicon.setAttribute('title', 'image');

  // Button path
  const anchor = document.createElement('a');
  anchor.textContent = 'Log in / Register';
  anchor.setAttribute('href', '#');
  anchor.setAttribute('title', 'button');
  anchor.classList.add('button', 'primary');

  // Append elements
  mainheadernav.append(mainheaderright);
  mainheaderright.append(headersearch);
  anchor.prepend(btnicon);
  mainheaderright.append(anchor);
  headersearch.append(headersearchbox);
  headersearchbox.append(headersearchicon);
  headersearchicon.append(searchanchor);
  searchanchor.append(iconImg);
  headersearchbox.append(searchinput);

  // Mobile code start
  const collapsediv = document.createElement('div');
  collapsediv.classList.add('collapse-bar');
  mainheadernav.prepend(collapsediv);
  setTimeout(() => {
    toggleMegaMenu();
  }, 500);
  const searchdiv = document.createElement('div');
  searchdiv.classList.add('search-bar');
  mainheadernav.append(searchdiv);
  setTimeout(() => {
    toggleSearchBar();
  }, 500);
  const breadcrumbsicon = document.createElement('img');
  breadcrumbsicon.classList.add('collapse-btn');
  breadcrumbsicon.src = '../../icons/breadcrumbs-icon.svg';
  const collapsemenu = document.createElement('p');
  collapsemenu.classList.add('collapse-menu');
  collapsemenu.innerHTML = ('Menu');
  const collapseclose = document.createElement('img');
  collapseclose.src = '../../icons/close-icon.svg';
  collapseclose.classList.add('close-btn');
  const colclose = document.createElement('p');
  colclose.classList.add('collapse-close');
  colclose.innerHTML = ('Close');
  collapsediv.prepend(breadcrumbsicon);
  collapsediv.append(collapsemenu);
  collapsediv.append(collapseclose);
  collapsediv.append(colclose);

  const searchicon = document.createElement('img');
  searchicon.classList.add('search-btn');
  searchicon.src = '../../icons/search-icon.svg';
  const searchmenu = document.createElement('p');
  searchmenu.classList.add('search-menu');
  searchmenu.innerHTML = ('Search');

  searchdiv.append(searchicon);
  searchdiv.append(searchmenu);
}

/**
 * Loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';
  const nav = document.createElement('header');
  nav.id = 'header';
  renderMegaMenu(nav);
  const navWrapper = document.createElement('div');
  navWrapper.className = 'main-header-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
