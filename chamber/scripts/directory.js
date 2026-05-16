// Current Year
document.querySelector('#currentYear').textContent =
    new Date().getFullYear();

// Last modified Date
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;

// ---------- Hamburger ------------
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



// =================================
// Member Directory Logic
// =================================

// ------- Dom Reference -----------
const membersContainer =document.getElementById('members-container'); 
const btnGrid =document.getElementById('btn-grid'); 
const btnList = document.getElementById('btn-list'); 
const memberCount = document.getElementById('member-count');

// --- Membership Level Labels & Classes ---
// Per project spec: 1 = Non-Profit, 2 = Silver, 3 = Gold
const MEMBERSHIP = {
  3: { label: "Gold",       cls: "gold",      icon: "★" },
  2: { label: "Silver",     cls: "silver",    icon: "◆" },
  1: { label: "Non-Profit", cls: "nonprofit", icon: "♦" },
};




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
        displayMembers(data.members);

        memberCount.textContent = `${data.members.length} Members`;
    } catch (error) {
        membersContainer.innerHTML = `<p class="error-msg">Unable to load member data. Please try again later.<br>
    <small>${error.message}</small>`
        console.error("Failed to fetch members:", error);
        return [];
    }
}


/* ===================================
          Display Members
          =====================================*/
function displayMembers(members) {
    membersContainer.innerHTML = '';
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
            <img src="${member.image}"
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
        membersContainer.appendChild(card);
    });
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








