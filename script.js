(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const savedTheme = localStorage.getItem('kaitao-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  function setTheme(theme) {
    root.dataset.theme = theme;
    const light = theme === 'light';
    themeButton.innerHTML = `<span aria-hidden="true">${light ? '☾' : '☀'}</span>`;
    themeButton.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
    localStorage.setItem('kaitao-theme', theme);
  }

  setTheme(savedTheme || preferredTheme);
  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));

  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('[aria-hidden="true"]').textContent = open ? 'Close' : 'Menu';
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('[aria-hidden="true"]').textContent = 'Menu';
  }));

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  reveals.forEach((element) => revealObserver.observe(element));

  const links = [...nav.querySelectorAll('a')];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach((link) => {
    const active = link.getAttribute('href') === currentPage;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
  });

  const currentYear = document.getElementById('current-year');
  if (currentYear) currentYear.textContent = new Date().getFullYear();
})();
