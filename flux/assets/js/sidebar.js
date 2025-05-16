const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeBtn');
    const content = document.getElementById('content');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      content.classList.add('blurred');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      content.classList.remove('blurred');
    });

document.addEventListener('DOMContentLoaded', function () {
  const linksList = document.getElementById('linkList');
  if (!linksList) return;

  const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');

  linksList.innerHTML = '';

  links.forEach(link => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a>`;
    linksList.appendChild(li);
  });
});
