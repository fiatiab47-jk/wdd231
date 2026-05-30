// =============================================
// join.mjs — Join Page Module
// Generates membership cards + modals from data
// =============================================

// =============================================
// MEMBERSHIP DATA — single source of truth
// =============================================
const memberships = [
    {
        id:       'np',
        cls:      'level-np',
        title:    'NP Membership',
        price:    'Free',
        tagline:  'For registered non-profit organisations serving the Greater Accra community.',
        benefits: [
            'Basic directory listing',
            'Access to chamber newsletters and updates',
            'Invitations to community networking events',
            'Use of chamber meeting rooms (limited)',
            'Recognition as a chamber non-profit partner',
        ],
        fee: 'Free for qualifying non-profits',
    },
    {
        id:       'bronze',
        cls:      'level-bronze',
        title:    'Bronze Membership',
        price:    'GH₵ 500 / year',
        tagline:  'Entry-level membership for small businesses and startups ready to connect.',
        benefits: [
            'Standard directory listing',
            'Access to all chamber newsletters and publications',
            'Invitations to networking luncheons (2 per year)',
            'Access to member-only training workshops',
            '10% discount on chamber event registrations',
            'Chamber certificate of membership',
        ],
        fee: 'GH₵ 500 per year',
    },
    {
        id:       'silver',
        cls:      'level-silver',
        title:    'Silver Membership',
        price:    'GH₵ 1,200 / year',
        tagline:  'For growing businesses seeking greater visibility and networking opportunities.',
        benefits: [
            'Enhanced directory listing with logo',
            'Spotlight feature on chamber home page (rotational)',
            'Access to all chamber publications and reports',
            'Invitations to networking luncheons (4 per year)',
            'Priority access to training workshops and seminars',
            '20% discount on chamber event registrations',
            'Social media mention (quarterly)',
            'Chamber certificate of membership',
        ],
        fee: 'GH₵ 1,200 per year',
    },
    {
        id:       'gold',
        cls:      'level-gold',
        title:    'Gold Membership',
        price:    'GH₵ 2,500 / year',
        tagline:  'Premium membership for established businesses wanting maximum exposure.',
        benefits: [
            'Premium directory listing with logo and description',
            'Priority spotlight on chamber home page every month',
            'Featured in all chamber publications and annual report',
            'Unlimited invitations to networking luncheons and events',
            'Free access to all training workshops and seminars',
            '30% discount on chamber event sponsorships',
            'Monthly social media promotion',
            'Dedicated chamber account manager',
            'Logo on chamber website and print materials',
            'Gold Member certificate and framed plaque',
        ],
        fee: 'GH₵ 2,500 per year',
    },
];



// ===============================
//       Build Cards 
// ===============================
const cardsContainer = document.querySelector('#cards-container');

if (cardsContainer) {
    memberships.forEach((level, index) => {
        const card = document.createElement('article');
        card.className = `level-card ${level.cls}`;
        card.style.animationDelay = `${index * 0.15}s`;
    
        card.innerHTML = `
            <h3>${level.title}</h3>
            <p class="level-price">${level.price}</p>
            <p class="level-desc">${level.tagline}</p>
            <button class="modal-btn">View Benefits</button>
        `;
    
        // Listener listens to know which level to show
        card.querySelector('.modal-btn').addEventListener('click', () => {
            displayMembershipDetails(level);
        });
        cardsContainer.appendChild(card);
    });
}

// ===============================
//       Build Modals
// ===============================
// Target the single modal element
const membershipModal = document.querySelector('#membership-modal');

// Function that populates and shows the modal
const displayMembershipDetails = (level) => {
    // Benefits -> Generate the list items from the array
    const benefitItems = level.benefits.map(b => `<li>${b}</li>`).join('');
    
    membershipModal.innerHTML = `
    <button id="closeModal" aria-label="Close ${level.title} modal">❌ Close</button>
    <h2>${level.title} Benefits</h2>
    <ul>${benefitItems}</ul>
    <p class="modal-cost"><strong>Annual Fee:</strong> ${level.fee}</p>
    `;

    // Show the Modal
    membershipModal.showModal();

    // Close Logic
    document.getElementById('closeModal').addEventListener('click', () => {
        membershipModal.close()
    });
    // membershipModal.addEventListener('click', (e) => {
    // if (e.target === membershipModal) {
    //     membershipModal.close();
    //     }
    // });
};



/*===================================
        Hidden Timestamp
=====================================*/
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
    timestampField.value = new Date().toLocaleString('en-GH', {
        dateStyle: 'full',
        timeStyle: 'short',
    });
}

/*======================================
    Save Fields Input to Local Storage
=======================================*/
// Select the form
const form = document.querySelector('#join-form');
// Select inputs and select  
const inputs = form.querySelectorAll('input, select');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        // Get saved values form localStorage or start with empty array
        const savedValue = JSON.parse(localStorage.getItem(input.name) || '[]');
        
        // Only save if field has a value and it's not already in the list 
        if (input.value && !savedValue.includes(input.value)) {
            // Add latest value to the front of the list
            savedValue.unshift(input.value);
            // Keep at most 5 most recent entries
            savedValue.splice(5);

            // Persist to storage
            localStorage.setItem(input.name, JSON.stringify(savedValue));
        }

        // Check if a datalist already exists for this input
        let datalist = document.getElementById(`list-${input.name}`);

        if (!datalist) {
            // Create new datalist and link it to the input
            datalist = document.createElement('datalist');
            // unique id per field
            datalist.id = `list-${input.name}`;
            // Insert after the input
            input.after(datalist);
            // Connect input to datalist
            input.setAttribute('list', datalist.id);
        }

        // Populates datalist with saved suggestions as clickable options
        datalist.innerHTML = savedValue.map(val =>
            `<option value="${val}">`).join('');   // One option per saved value
        
    });
   
});


// Cleanup the local form after a successful form submission.
form.addEventListener('submit', (e) => {
    // Prevent the default immediate form submission so we can 
    // control the timing
    e.preventDefault();

    // Capture all form field values
    const formData = new FormData(form);

    // Convert to URL query string (e.g. firsName=Kwame&lastName=Mensah)
    const param = new URLSearchParams(formData);
    
    // Build the full redirect URL with params appended
    const redirectURL = `thankyou.html?${param}`;
    
    // Wait for 3 seconds, then redirect to your thank you page
    setTimeout(() => {
        // Reset the fields visually
        form.reset();

        window.location.href = redirectURL;
    }, 3000);
});
