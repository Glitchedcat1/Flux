const linkForm = document.getElementById('linkForm');
  const linksList = document.getElementById('linksList');

  function loadLinks() {
    const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');
    linksList.innerHTML = '';
    links.forEach((link, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${link.url}" target="_blank">${link.name}</a>
        <button onclick="removeLink(${index})">❌</button>
      `;
      linksList.appendChild(li);
    });
  }

  function saveLink(name, url) {
    const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');
    links.push({ name, url });
    localStorage.setItem('quickLinks', JSON.stringify(links));
    loadLinks();
  }

  function removeLink(index) {
    const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');
    links.splice(index, 1);
    localStorage.setItem('quickLinks', JSON.stringify(links));
    loadLinks();
  }

  linkForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('linkName').value;
    const url = document.getElementById('linkURL').value;
    saveLink(name, url);
    linkForm.reset();
  });

  // Load links on page load
  window.onload = loadLinks;
