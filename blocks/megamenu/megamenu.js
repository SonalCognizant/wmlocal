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

function renderMegaMenu(nav) {
  const section1 = document.createElement('div');
  section1.className = 'navbar-brand';
  const navbarcontainer = document.createElement('div');
  navbarcontainer.className = 'navbar-container';
  const section2 = document.createElement('div');
  section2.className = 'navbar-menu';
  const menucontainer = document.createElement('div');
  menucontainer.className = 'menucontainer';
  const navbarul = document.createElement('ul');
  navbarul.className = 'navbar-ul';
  const menuItems = JSON.parse(navmenu);

  menuItems.forEach((item) => {
    const navbarli = document.createElement('li');
    navbarli.className = 'navbar-li';

    const navbaranchor = document.createElement('a');
    navbaranchor.setAttribute('href', item.href);
    navbaranchor.innerText = item.title;

    // Active menu
    navbaranchor.addEventListener('click', () => {
      const anchoractive = document.querySelectorAll('.navbar-li a');
      anchoractive.forEach((anchor) => {
        anchor.classList.remove('active');
      });
      navbaranchor.classList.add('active');
    });
    navbarli.appendChild(navbaranchor);

    // Menu list
    if (item.children) {
      const navbarspan = document.createElement('span');
      navbarspan.className = 'navbar-span';
      const navbaruparrow = document.createElement('img');
      navbaruparrow.className = 'navbar-up-arrow';
      navbaruparrow.src = '../../icons/up-arrow.svg';
      navbaruparrow.setAttribute('title', 'image');
      const navbardownarrow = document.createElement('img');
      navbardownarrow.className = 'navbar-down-arrow';
      navbardownarrow.src = '../../icons/down-arrow.svg';
      navbardownarrow.setAttribute('title', 'image');

      navbarspan.appendChild(navbaruparrow);
      navbarspan.appendChild(navbardownarrow);
      navbarli.appendChild(navbarspan);

      const submenublock = document.createElement('div');
      submenublock.className = 'submenu-block';
      const submenuul = document.createElement('div');
      submenuul.className = 'submenu-ul';
      item.children.forEach((child) => {
        const submenuli = document.createElement('ul');
        const title = document.createElement('h4');
        title.append(child.title);
        submenuli.append(title);
        submenuul.append(submenuli);
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
      const submenulist = document.createElement('div');
      submenulist.className = 'submenu-list';
      const submenucontent = document.createElement('div');
      submenucontent.className = 'submenu-content';
      submenublock.appendChild(submenulist);
      submenulist.appendChild(submenuul);
      submenublock.appendChild(submenucontent);
      navbarli.appendChild(submenublock);
    }

    navbarul.appendChild(navbarli);
  });

  nav.append(section1);
  section2.appendChild(menucontainer);
  nav.append(section2);
  section1.append(navbarcontainer);
  menucontainer.append(navbarul);

  // Logo path
  const logoImg = document.createElement('img');
  logoImg.src = '../../images/global/header-logo.png';
  logoImg.setAttribute('title', 'image');
  logoImg.className = 'navbar-logo';
  navbarcontainer.append(logoImg);

  // Search path
  const navbarright = document.createElement('div');
  navbarright.className = 'navbar-right';
  const search = document.createElement('div');
  search.classList.add('navbar-search');
  const searchbox = document.createElement('div');
  searchbox.className = 'navbar-search-box';
  const searchicon = document.createElement('span');
  searchicon.classList.add('icon-search');
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
  btnicon.classList.add('login-icon');
  btnicon.src = '../../icons/login-btn.svg';
  btnicon.setAttribute('title', 'image');

  // Button path
  const anchor = document.createElement('a');
  anchor.textContent = 'Log in / Register';
  anchor.setAttribute('href', '#');
  anchor.setAttribute('title', 'button');
  anchor.classList.add('button', 'primary');

  // Append elements
  navbarcontainer.append(navbarright);
  navbarright.append(search);
  anchor.prepend(btnicon);
  navbarright.append(anchor);
  search.append(searchbox);
  searchbox.append(searchicon);
  searchicon.append(searchanchor);
  searchanchor.append(iconImg);
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
