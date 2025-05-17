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
  if (!linksList || typeof __uv$config === 'undefined') return;

  let links = JSON.parse(localStorage.getItem('quickLinks') || '[]');

  function renderLinks() {
    linksList.innerHTML = '';

    links.forEach((link, index) => {
      const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(link.url);

      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${encodedUrl}" target="_blank">${link.name}</a>
        <button class="remove-link" data-index="${index}" title="Remove">x</button>
      `;
      linksList.appendChild(li);
    });

    document.querySelectorAll('.remove-link').forEach(button => {
      button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        links.splice(index, 1);
        localStorage.setItem('quickLinks', JSON.stringify(links));
        renderLinks(); // re-render list
      });
    });
  }

  renderLinks();
});
