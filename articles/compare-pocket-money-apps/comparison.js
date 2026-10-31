(() => {
  const table = document.querySelector('#comparison-table');
  if (!table) return;
  const groups = {
    tracker: ['familypocket','allowance-bot','chorsee','iallowance','bomad'],
    hybrid: ['rooster-money'],
    banking: ['greenlight','gohenry','acorns-early','spriggy','busykid','squareone','revolut-youth']
  };
  const all = Object.values(groups).flat();
  const scroll = document.querySelector('.table-scroll');
  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      const visible = new Set(view === 'all' ? all : view === 'tracker' ? [...groups.tracker,...groups.hybrid] : ['familypocket',...groups.hybrid,...groups.banking]);
      table.querySelectorAll('[data-app]').forEach(cell => { cell.hidden = !visible.has(cell.dataset.app); });
      table.querySelectorAll('[data-column-group]').forEach(header => {
        const count = groups[header.dataset.columnGroup].filter(app => visible.has(app)).length;
        header.hidden = count === 0;
        if (count) header.colSpan = count;
      });
      table.querySelectorAll('.section-fill').forEach(cell => { cell.colSpan = visible.size; });
      const cols = table.querySelector('colgroup');
      const featureCol = document.createElement('col');
      featureCol.className = 'feature-col';
      const appCols = [...visible].map(() => {
        const col = document.createElement('col');
        col.className = 'app-col';
        return col;
      });
      cols.replaceChildren(featureCol,...appCols);
      document.querySelectorAll('[data-view]').forEach(other => {
        const active = other === button;
        other.classList.toggle('active',active);
        other.setAttribute('aria-pressed',String(active));
      });
      document.querySelector('#view-status').textContent = visible.size+' apps · FamilyPocket stays in each view · Features may vary by plan and country';
      scroll.scrollLeft = 0;
      scroll.scrollTop = 0;
    });
  });
  function showNote() {
    if (!/^#note-\d+$/.test(location.hash)) return;
    const note = document.getElementById(location.hash.slice(1));
    if (note) { note.open = true; note.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }
  }
  document.querySelectorAll('a[href^="#note-"]').forEach(link => link.addEventListener('click', () => {
    const note = document.getElementById(link.hash.slice(1));
    if (note) note.open = true;
  }));
  window.addEventListener('hashchange',showNote);
  if (location.hash) showNote();
})();
