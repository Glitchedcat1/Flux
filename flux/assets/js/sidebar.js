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

      // ✅ Create internal flex container for layout
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.gap = '6px';

      // Create the <a>
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = link.name;
      a.style.cursor = 'pointer';

      a.addEventListener('click', (e) => {
        e.preventDefault();

        const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(link.url);
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

        win.document.title = '\u200B';
        const linkElem = win.document.createElement('link');
        linkElem.rel = 'icon';
        linkElem.href = '/flux/assets/img/blank.ico';
        win.document.head.appendChild(linkElem);
      });

      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-link';
      removeBtn.textContent = '❌';
      removeBtn.title = 'Remove';
      removeBtn.setAttribute('data-index', index);

      removeBtn.addEventListener('click', function () {
        links.splice(index, 1);
        localStorage.setItem('quickLinks', JSON.stringify(links));
        renderLinks();
      });

      container.appendChild(a);
      container.appendChild(removeBtn);
      li.appendChild(container);
      linksList.appendChild(li);
    });
  }

  renderLinks();
});
