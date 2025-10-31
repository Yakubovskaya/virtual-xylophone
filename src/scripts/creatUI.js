function createContainer(parentId) {
  const container = document.createElement('div');
  container.id = 'keyboard-container';
  container.classList.add('keyboard-container');
  document.getElementById(parentId).appendChild(container);
  return container;
}