const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');

    // Scroll to top when opening
    if (navBar.classList.contains('show')) {
        navBar.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    }
});

