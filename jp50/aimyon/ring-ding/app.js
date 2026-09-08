const bindToggle = (id, className, show, hide) => {
  const button = document.getElementById(id);
  button.addEventListener('click', () => {
    const active = document.body.classList.toggle(className);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? show : hide;
  });
};
bindToggle('reading-toggle', 'hide-reading', '顯示假名', '隱藏假名');
bindToggle('translation-toggle', 'hide-translations', '顯示逐句中文', '隱藏逐句中文');
document.querySelector('.controls').hidden = false;
document.querySelector('.search').hidden = false;
const search = document.getElementById('word-search');
const words = [...document.querySelectorAll('.word')];
const count = document.getElementById('word-count');
const normalize = text => text.normalize('NFKC').toLocaleLowerCase();
function filterWords() {
  const query = normalize(search.value.trim());
  for (const word of words) word.hidden = !normalize(word.dataset.search).includes(query);
  const visible = words.filter(word => !word.hidden).length;
  count.textContent = `顯示 ${visible} / ${words.length} 個字詞${visible ? '' : '；試試較短的日文或中文關鍵字。'}`;
}
search.addEventListener('input', filterWords);
document.getElementById('clear-search').addEventListener('click', () => {
  search.value = '';
  filterWords();
  search.focus();
});
function revealTarget() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  if (target.classList.contains('word') && target.hidden) {
    search.value = '';
    filterWords();
    target.scrollIntoView({ block: 'start' });
  }
  for (let parent = target.parentElement; parent; parent = parent.parentElement) {
    if (parent instanceof HTMLDetailsElement) parent.open = true;
  }
}
window.addEventListener('hashchange', revealTarget);
filterWords();
revealTarget();
