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
      const li = document.createElement('li');

      // Create clickable <a> with no href (we’ll handle click manually)
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = link.name;
      a.style.cursor = 'pointer';

      a.addEventListener('click', (e) => {
        e.preventDefault();

        const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(link.url);

        // Open about:blank and inject the UV iframe
        const win = window.open('about:blank', '_blank');
        if (!win) {
          alert("Please allow popups for this site.");
          return;
        }

        const iframe = win.document.createElement('iframe');
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.src = encodedUrl;

        win.document.body.style.margin = "0";
        win.document.body.style.height = "100vh";
        win.document.body.appendChild(iframe);

        win.document.title = '\u200B'; // zero-width space for stealth
        const linkElem = win.document.createElement('link');
        linkElem.rel = 'icon';
        linkElem.href = '/flux/assets/img/blank.ico'; // your stealth favicon
        win.document.head.appendChild(linkElem);
      });

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-link';
      removeBtn.textContent = '❌';
      removeBtn.title = 'Remove';
      removeBtn.setAttribute('data-index', index);

      removeBtn.addEventListener('click', function () {
        links.splice(index, 1);
        localStorage.setItem('quickLinks', JSON.stringify(links));
        renderLinks(); // refresh
      });

      li.appendChild(a);
      li.appendChild(removeBtn);
      linksList.appendChild(li);
    });
  }

  renderLinks();
});
