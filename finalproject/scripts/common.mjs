// Shared Footer Dates
// ============================
export function setFooterDates() { 
    // Current Year
    document.querySelector('#currentYear').textContent =
        new Date().getFullYear();
    
    // Last modified Date
    document.getElementById('lastModified').textContent =
        `Last Modification: ${document.lastModified}`;
}


// =======================================
//          Hamburger Navigation
// =======================================
export function setupNavigation() {

    const navButton = document.querySelector('#nav-button');
    const navBar = document.querySelector('#nav-bar');

    // Guard: if either element is missing, exit quietly
    // This Prevents errors on the page that have no nav
    if (!navButton || !navBar) {
        console.warn('Navigation not found on this page.');
        return;
    }
    
    navButton.addEventListener('click', () => {

        // toggle() adds the class if absent, removes it if present
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');

        console.log(navBar.className);
    
        // Scroll nav into view when opening on small screens
        if (navBar.classList.contains('show')) {
            navBar.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }

        // Checks nav-bar element to see if is currently has
        // css class 'show' applied to it
        // const isOpen = navBar.classList.contains('show');
        // Update aria-expanded for accessibility
        // tells screen readers whether the menu is open or closed
        // navButton.setAttribute('aria-expanded', isOpen);
    });
    
}