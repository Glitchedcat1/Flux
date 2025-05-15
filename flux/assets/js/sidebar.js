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
