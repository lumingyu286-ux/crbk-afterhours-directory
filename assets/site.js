const searchInput = document.getElementById('site-search');
const searchForm = document.getElementById('search-form');
const clearButton = document.getElementById('search-clear');
const links = [...document.querySelectorAll('.site-link[data-search]')];
const sections = [...document.querySelectorAll('[data-section]')];
const status = document.getElementById('result-status');
const empty = document.getElementById('empty-message');

function applySearch() {
  const term = searchInput.value.trim().toLocaleLowerCase();
  let visible = 0;
  links.forEach(link => {
    const matches = !term || link.dataset.search.toLocaleLowerCase().includes(term) || link.textContent.toLocaleLowerCase().includes(term);
    link.hidden = !matches;
    if (matches) visible++;
  });
  sections.forEach(section => {
    section.hidden = !section.querySelector('.site-link:not([hidden])');
  });
  clearButton.hidden = !term;
  empty.hidden = !term || visible > 0;
  status.textContent = term ? `找到 ${visible} 个匹配网址` : `共收录 ${links.length} 个网址`;
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('directory').scrollIntoView({ behavior: 'smooth' });
});
searchInput.addEventListener('input', applySearch);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  applySearch();
  searchInput.focus();
});
document.querySelectorAll('.category-nav a, .mobile-categories a').forEach(anchor => {
  anchor.addEventListener('click', () => {
    if (searchInput.value) {
      searchInput.value = '';
      applySearch();
    }
  });
});
applySearch();

