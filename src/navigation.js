const header = document.querySelector('.header');
const button = header.querySelector('.menu-toggle');
const navigation = header.querySelector('nav');
const mobile = window.matchMedia('(max-width: 700px)');

function setOpen(open) {
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  header.classList.toggle('menu-open', open);
}

header.classList.add('menu-ready');
button.addEventListener('click', () => {
  setOpen(button.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && mobile.matches) {
    setOpen(false);
    button.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
    setOpen(false);
    button.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) setOpen(false);
});
header.addEventListener('focusout', (event) => {
  if (!header.contains(event.relatedTarget)) setOpen(false);
});
mobile.addEventListener('change', () => {
  if (mobile.matches && navigation.contains(document.activeElement)) {
    button.focus();
  } else if (!mobile.matches && document.activeElement === button) {
    navigation.querySelector('a').focus();
  }
  setOpen(false);
});
