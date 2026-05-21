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

    if (!navButton || !navBar) {
        console.warn('Navigation not found on this page.');
        return;
    }
    
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
    console.log(navButton);
console.log(navBar);
}


const MEMBERSHIP = {
    3: { label: "Gold",       cls: "gold",      icon: "★" },
    2: { label: "Silver",     cls: "silver",    icon: "◆" },
    1: { label: "Non-Profit", cls: "nonprofit", icon: "♦" },
};

/* ===================================
    Display Members
=====================================*/
export function displayMembers(container, members) {
    container.innerHTML = '';
    members.forEach(member => {
    const membership = MEMBERSHIP[member.membershipLevel];

    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML =` 
        <div class="tag-info">
        <h2>${member.name}</h2>
        <span>${member.description}</span>
        </div>

        <div class="profile-grid">
        <img src="images/${member.image}"
        alt = "${member.name} logo"
        loading="lazy" width="200" height="250">
        
        <div class="member-info">

        <p class="membership ${membership.cls}">
        ${membership.icon} ${membership.label} Member
        </p>

        <p>${member.address}</p>
        <p> ${member.phone}</p>

        <a href="${member.website}" target="_blank">
            Visit Website
        </a>
        </div>
        </div>
        `;
    container.appendChild(card);
});
}



if (document.getElementById('members-container') &&
    document.getElementById('btn-grid') &&
    document.getElementById('btn-list')
) {
    // =================================
    // Member Directory Logic
    // =================================
    
    // ------- Dom Reference -----------
    const membersContainer =document.getElementById('members-container'); 
    const btnGrid =document.getElementById('btn-grid'); 
    const btnList = document.getElementById('btn-list'); 
    const memberCount = document.getElementById('member-count');
    
    
    // =================================
    //   Fetch Members From JSON
    // =================================
    const fetchMembers = async () => {
        try {
            membersContainer.innerHTML = `<p class="Loading-msg">Loading members...</p>`;
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            displayMembers(membersContainer, data.members);
    
            memberCount.textContent = `${data.members.length} Members`;
        } catch (error) {
            membersContainer.innerHTML = `<p class="error-msg">Unable to load member data. Please try again later.<br>
        <small>${error.message}</small>`
            console.error("Failed to fetch members:", error);
            return [];
        }
    }

    
    
    /* ======================================
            Grid / List Toggle
    ==========================================*/
    btnGrid.addEventListener('click', () => {
        membersContainer.classList.add("grid-view");
        membersContainer.classList.remove("list-view");
    
        btnGrid.classList.add("active");
        btnList.classList.remove("active");
    });
    
    btnList.addEventListener('click', () => {
        membersContainer.classList.add("list-view");
        membersContainer.classList.remove("grid-view");
    
        btnList.classList.add("active");
        btnGrid.classList.remove("active");
    });
    
    fetchMembers();
}

setFooterDates();
setupNavigation();

console.log('directory module loaded')
