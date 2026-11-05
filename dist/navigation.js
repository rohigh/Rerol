(() => {
  const groups = [...document.querySelectorAll('.nav-group')];
  for (const group of groups) {
    group.addEventListener('toggle', () => {
      if (!group.open) return;
      for (const other of groups) if (other !== group) other.open = false;
    });
    group.addEventListener('keydown', event => {
      if (event.key === 'Escape' && group.open) {
        event.stopPropagation();
        group.open = false;
        group.querySelector('summary').focus();
      }
    });
  }
  document.addEventListener('click', event => {
    for (const group of groups) if (!group.contains(event.target)) group.open = false;
  });
})();
