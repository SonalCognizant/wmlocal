import { loadFragment } from '../fragment/fragment.js';

function transformData(flatData) {
  const result = [];

  // Create a map to hold references to the parent categories by their titles
  const parentMap = {};

  // Iterate through the flat data and build the hierarchical structure
  flatData.forEach((item) => {
    const parentTitle = item['Parent Title'];
    const title = item.Title;
    const subTitle = item['Sub Title'];
    const href = item.Href;
    const description = item.Description;

    // If there is no parent in the result yet, add it to the map
    if (!parentMap[parentTitle]) {
      parentMap[parentTitle] = { title: parentTitle, children: [] };
      result.push(parentMap[parentTitle]);
    }

    // Get the parent object
    const parent = parentMap[parentTitle];

    // If the child with the title does not exist under the parent, create it
    let child = parent.children.find((c) => c.title === title);
    if (!child && title) {
      child = { title, subChildren: [] };
      parent.children.push(child);
    }

    // Add subTitle to the subChildren if it exists
    if (subTitle) {
      child.subChildren.push({
        title: subTitle,
        href,
        description,
      });
    }
  });

  // Ensure that 'Home' and other parents without children are included without 'children' array
  return result.map((item) => {
    // If there are no children, remove the 'children' property
    if (item.children.length === 0) {
      delete item.children;
    }
    return item;
  });
}

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

// render header content fargment
async function renderheaderfargment(loadheaderdata) {
  const fragmentcontent = `/content-fragment/header/${loadheaderdata}`;
  // console.log('check', loadheaderdata);
  const headerpath = await loadFragment(fragmentcontent);
  const headerviewcontent = headerpath?.firstElementChild;
  return headerviewcontent;
}

function titletransformation(value) {
  let path;
  if (value) {
    path = value.toLowerCase().replace(' ', '-');
  }
  return path;
}

function renderMegaMenu(nav, navmenu) {
  const mainheadersection = document.createElement('div');
  mainheadersection.className = 'main-header-section';
  const mainheadernav = document.createElement('div');
  mainheadernav.className = 'main-header-nav';
  const mainheadermenu = document.createElement('div');
  mainheadermenu.className = 'main-header-menu';
  const headermenublock = document.createElement('div');
  headermenublock.className = 'header-menu-block';
  const headermenuul = document.createElement('ul');
  headermenuul.className = 'header-menu-ul';
  const menuItems = JSON.parse(navmenu);
  // Menu bar view
  menuItems.forEach((item) => {
    const headermenuli = document.createElement('li');
    headermenuli.className = 'header-menu-li';
    const headermenulink = document.createElement('div');
    headermenulink.className = 'header-menu-link';
    headermenuli.prepend(headermenulink);
    if (!item.children || item.children.length === 0) {
      const navbaranchor = document.createElement('a');
      navbaranchor.setAttribute('href', '#');
      navbaranchor.innerText = item.title;
      headermenuli.appendChild(navbaranchor);
      // Active menu
      navbaranchor.addEventListener('click', (e) => {
        const navbarselect = e.target?.closest('.header-menu-link');
        if (navbarselect?.classList.contains('menu-active')) {
          navbarselect?.classList.remove('menu-active');
        } else {
          const anchoractive = document.querySelectorAll('.header-menu-link');
          anchoractive.forEach((anchor) => {
            anchor.classList.remove('menu-active');
          });
          navbarselect?.classList.add('menu-active');
        }
      });
      headermenulink.append(navbaranchor);
    } else {
      const navbarpara = document.createElement('p');
      navbarpara.innerText = item.title;
      navbarpara.className = 'navbarpara';
      headermenulink.appendChild(navbarpara);
      headermenulink.addEventListener('click', (e) => {
        const navbarselect = e.target?.closest('.header-menu-link');
        if (navbarselect?.classList.contains('show-menu')) {
          navbarselect?.classList.remove('show-menu');
        } else {
          const anchoractive = document.querySelectorAll('.header-menu-link');
          anchoractive.forEach((anchor) => {
            anchor.classList.remove('show-menu');
          });
          navbarselect?.classList.add('show-menu');
        }
      });
    }

    // View menu list
    if (item.children) {
      const headermenuicon = document.createElement('span');
      headermenuicon.className = 'header-menu-icon';
      const menuuparrow = document.createElement('img');
      menuuparrow.className = 'menu-up-arrow';
      menuuparrow.src = '../../icons/up-arrow.svg';
      menuuparrow.setAttribute('title', 'image');
      const menudownarrow = document.createElement('img');
      menudownarrow.className = 'menu-down-arrow';
      menudownarrow.src = '../../icons/down-arrow.svg';
      menudownarrow.setAttribute('title', 'image');

      headermenuicon.appendChild(menuuparrow);
      headermenuicon.appendChild(menudownarrow);
      headermenulink.appendChild(headermenuicon);
      // View submenu list
      const headermenuitem = document.createElement('div');
      headermenuitem.className = 'header-menu-item';
      const headersubmenuul = document.createElement('div');
      headersubmenuul.className = 'header-submenu-ul';

      const headersubmenulist = document.createElement('div');
      headersubmenulist.className = 'header-submenu-list';
      const menusubmenucontent = document.createElement('div');
      menusubmenucontent.className = 'menu-submenu-content';
      headermenuitem.appendChild(headersubmenulist);
      headersubmenulist.appendChild(headersubmenuul);
      headermenuitem.appendChild(menusubmenucontent);
      headermenuli.append(headermenuitem);

      item.children.forEach((child) => {
        const submenuul = document.createElement('ul');
        const title = document.createElement('h4');
        title.append(child.title);
        submenuul.append(title);
        headersubmenuul.append(submenuul);
        if (child.subChildren) {
          child.subChildren.forEach((subchild) => {
            const submenuchild = document.createElement('li');
            const submenuanchor = document.createElement('a');
            submenuanchor.setAttribute('href', subchild.href);
            submenuanchor.append(subchild.title);
            submenuul.append(submenuchild);
            submenuchild.append(submenuanchor);
            if (subchild.description) {
              const desc = document.createElement('p');
              desc.append(subchild.description);
              submenuchild.append(desc);
            }
          });
        }
      });
      try {
        const titlepath = titletransformation(item?.title);
        renderheaderfargment(titlepath).then((res) => {
          menusubmenucontent.append(res);
        });
      } catch (error) {
        console.log('error', error);
      }
    }
    headermenuul.appendChild(headermenuli);
  });
  // Append main header menu
  nav.append(mainheadersection);
  mainheadermenu.appendChild(headermenublock);
  nav.append(mainheadermenu);
  mainheadersection.append(mainheadernav);
  headermenublock.append(headermenuul);

  // Logo path
  const headerlogodiv = document.createElement('div');
  headerlogodiv.classList.add('main-header-logo');
  const headerlogoanchor = document.createElement('a');
  headerlogoanchor.setAttribute('href', '/');
  const logoImg = document.createElement('img');
  logoImg.src = '../../images/global/header-logo.png';
  logoImg.setAttribute('title', 'Wellmark Logo');
  logoImg.setAttribute('alt', 'Wellmark Logo');
  logoImg.className = 'navbar-logo';
  mainheadernav.append(headerlogodiv);
  headerlogodiv.append(headerlogoanchor);
  headerlogoanchor.append(logoImg);

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
  // Button path
  const btnicon = document.createElement('img');
  btnicon.classList.add('main-header-login-icon');
  btnicon.src = '../../icons/login-btn.svg';
  btnicon.setAttribute('title', 'image');
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
  const collapsebarmenu = document.createElement('div');
  collapsebarmenu.classList.add('collapse-bar-menu');
  const collapsebarclose = document.createElement('div');
  collapsebarclose.classList.add('collapse-bar-close');

  const breadcrumbsicon = document.createElement('img');
  breadcrumbsicon.classList.add('collapse-btn');
  breadcrumbsicon.src = '../../icons/breadcrumbs-icon.svg';
  breadcrumbsicon.setAttribute('data-toggle', 'modal');
  const collapsemenu = document.createElement('p');
  collapsemenu.classList.add('collapse-menu');
  collapsemenu.innerHTML = ('Menu');
  const collapseclose = document.createElement('img');
  collapseclose.src = '../../icons/close-icon.svg';
  collapseclose.setAttribute('data-dismiss', 'modal');
  collapseclose.classList.add('close-btn');
  const colclose = document.createElement('p');
  colclose.classList.add('collapse-close');
  colclose.innerHTML = ('Close');
  collapsediv.append(collapsebarmenu);
  collapsebarmenu.prepend(breadcrumbsicon);
  collapsebarmenu.append(collapsemenu);
  collapsediv.append(collapsebarclose);
  collapsebarclose.prepend(collapseclose);
  collapsebarclose.append(colclose);

  const searchicon = document.createElement('img');
  searchicon.classList.add('search-btn');
  searchicon.src = '../../icons/search-icon.svg';
  const searchmenu = document.createElement('p');
  searchmenu.classList.add('search-menu');
  searchmenu.innerHTML = ('Search');
  searchdiv.append(searchicon);
  searchdiv.append(searchmenu);

  // Login & Register division
  const sectionblock = document.createElement('div');
  sectionblock.classList.add('section-block', 'blue-550');
  const sectionlogin = document.createElement('div');
  sectionlogin.classList.add('section-login', 'button-container');
  const sectionregister = document.createElement('div');
  sectionregister.classList.add('section-register', 'button-container');
  const loginheading = document.createElement('h4');
  loginheading.classList.add('login-heading');
  loginheading.innerHTML = ('Log in to your account');
  const emaillabel = document.createElement('p');
  emaillabel.classList.add('email-label');
  emaillabel.innerHTML = ('User ID or Email (required)');
  const logininput = document.createElement('input');
  logininput.className = 'input-login';
  logininput.setAttribute('type', 'text');
  logininput.setAttribute('name', 'username');
  const passwordlabel = document.createElement('p');
  passwordlabel.classList.add('password-label');
  passwordlabel.innerHTML = ('Password (required)');
  const passwordinput = document.createElement('input');
  passwordinput.className = 'input-password';
  passwordinput.setAttribute('type', 'password');
  passwordinput.setAttribute('name', 'password');
  const loginbtn = document.createElement('a');
  loginbtn.textContent = 'Log in';
  loginbtn.setAttribute('href', '#');
  loginbtn.setAttribute('title', 'button');
  loginbtn.classList.add('button', 'primary');
  const registerbtn = document.createElement('a');
  registerbtn.textContent = 'Register';
  registerbtn.setAttribute('href', '#');
  registerbtn.setAttribute('title', 'button');
  registerbtn.classList.add('button', 'secondary');
  const forgetuser = document.createElement('p');
  const forgetuserlink = document.createElement('a');
  forgetuserlink.setAttribute('href', '#');
  forgetuserlink.classList.add('forget-user');
  forgetuserlink.innerHTML = ('Forgot User ID or Email?');
  const forgetpassword = document.createElement('p');
  const forgetpasswordlink = document.createElement('a');
  forgetpasswordlink.setAttribute('href', '#');
  forgetpasswordlink.classList.add('forget-password');
  forgetpasswordlink.innerHTML = ('Forgot Password?');
  // Section login append
  headermenublock.appendChild(sectionblock);
  sectionblock.appendChild(sectionlogin);
  sectionlogin.appendChild(loginheading);
  sectionlogin.appendChild(emaillabel);
  sectionlogin.appendChild(logininput);
  sectionlogin.appendChild(passwordlabel);
  sectionlogin.appendChild(passwordinput);
  sectionlogin.appendChild(loginbtn);
  // Section Register append
  sectionblock.appendChild(sectionregister);
  sectionregister.appendChild(registerbtn);
  sectionregister.appendChild(forgetuser);
  forgetuser.appendChild(forgetuserlink);
  sectionregister.appendChild(forgetpassword);
  forgetpassword.appendChild(forgetpasswordlink);
}

function generateUrl(dataArray, index) {
  const locateIndex = index - 1;
  const dynamicString = dataArray.slice(0, index).join().replaceAll(',', '/');
  const breadcrumbUrl = window.location.origin.concat('/', dynamicString);
  const productElement = document.querySelector(`[data-breadcrumb-value=${dataArray[locateIndex]}]`);
  productElement.setAttribute('href', breadcrumbUrl);
}

// Function to fetch the JSON and transform it
function fetchAndTransformData(nav) {
  const jsonUrl = '/content-fragment/megamenu.json';
  fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const result = transformData(data.data); // Assuming the JSON has a `data` property
      const navmenu = JSON.stringify(result, null, 2);
      renderMegaMenu(nav, navmenu);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Active default menu
function highlightEventlistener(nav) {
  const activemenu = nav.querySelectorAll('.header-menu-link');
  const activemenushow = window.location.pathname.split('/');
  activemenu.forEach((activenav) => {
    const linktext = activenav.querySelector('a')?.textContent;
    if (activemenushow.includes(linktext?.toLowerCase())) {
      activenav.classList.add('menu-active');
    }
  });
}

// Outside click submenu close
window.addEventListener('click', (e) => {
  const handleClickOutside = document.querySelectorAll('.header-menu-link');
  handleClickOutside.forEach((checkactivemenu) => {
    const outsideClickListener = e.target.closest('.header-menu-link');
    const outsideClick = e.target?.closest('.header-menu-li')?.querySelector('.header-menu-item');
    const closeactive = outsideClickListener === null && outsideClick === undefined;
    if (closeactive) {
      checkactivemenu.classList.remove('show-menu');
    }
  });
});

/**
 * Loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';
  const nav = document.createElement('div');
  nav.className = 'main-header';
  fetchAndTransformData(nav);
  const navWrapper = document.createElement('div');
  navWrapper.className = 'main-header-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
  highlightEventlistener(nav);
  // create the breadcrumbs for the page
  const breadCrumbTag = document.querySelector('meta[name="breadcrumbs"]').content;
  // if the page has the metadata as like true then loading the breadcrumbs to the page
  if (breadCrumbTag.toLowerCase() === 'true') {
    const locationPath = window.location.pathname.split('/');
    locationPath.shift();
    // creation of breadcrumb ul
    const breadCrumbdiv = document.createElement('ul');
    breadCrumbdiv.classList.add('breadcrumb-ul');
    const mainTag = document.querySelector('main');
    mainTag.prepend(breadCrumbdiv);
    const breadcrumLength = locationPath.length;
    locationPath.forEach((index) => {
      // creation of breadcrumbs lists
      const breadcrumbList = document.createElement('li');
      breadcrumbList.classList.add('breadcrumb-list');
      const breadcrumbaTag = document.createElement('a');
      breadcrumbaTag.textContent = index;
      breadcrumbaTag.setAttribute('data-breadcrumb-value', index);
      breadcrumbList.append(breadcrumbaTag);
      breadCrumbdiv.append(breadcrumbList);
      // get the image for the breadcrumb
      const breadcrumbImg = document.createElement('img');
      breadcrumbImg.src = '/icons/breadcrumb-divider.svg';
      breadcrumbImg.setAttribute('data-icon-name', 'divider');
      breadcrumbImg.className = 'divider-img';
      breadcrumbList.append(breadcrumbImg);
      // get the image for the breadcrumb
      const breadcrumbImg2 = document.createElement('img');
      breadcrumbImg2.src = '/icons/breadcrumb-backarrow.svg';
      breadcrumbImg2.setAttribute('data-icon-name', 'divider');
      breadcrumbImg2.className = 'backarrow';
      breadcrumbList.prepend(breadcrumbImg2);
    });
    const breadcrumurlLength = locationPath.length;
    locationPath.forEach((index, key) => {
      const indexDepricate = breadcrumurlLength - key;
      const lastchildUrls = indexDepricate === breadcrumLength;
      if (!lastchildUrls) {
        generateUrl(locationPath, indexDepricate);
      }
    });
  }
}
