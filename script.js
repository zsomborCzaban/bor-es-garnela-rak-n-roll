const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const brandLink = document.querySelector('.brand');

brandLink.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#kezdolap');
});

menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const navigationLinks = [...document.querySelectorAll('.main-nav a')];
const navigationSections = navigationLinks
  .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter(({ section }) => section);

const setActiveLink = (activeLink) => {
  navigationLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

const updateActiveNavigation = () => {
  const pageMarker = window.scrollY + window.innerHeight * 0.35;
  let activeSection = navigationSections[0];

  navigationSections.forEach((item) => {
    if (item.section.offsetTop <= pageMarker) activeSection = item;
  });

  if (activeSection) setActiveLink(activeSection.link);
};

window.addEventListener('scroll', updateActiveNavigation, { passive: true });
window.addEventListener('resize', updateActiveNavigation);
updateActiveNavigation();

document.querySelector('#ev').textContent = new Date().getFullYear();
