import { places } from "../data/places.mjs";

const discoverGrid = document.querySelector('#discover-grid');
const visitMessage = document.querySelector('#visit-message');



// Build and display discover cards from imported data.
const displayPlaces = () => {
    discoverGrid.innerHTML = '';

    places.forEach((place, index) => {
        const card = document.createElement('section');
        card.classList.add("discover-card");  
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img
            src="${place.image}"
            alt="${place.name}"
            width="300"
            height="200"
            loading="lazy">
        </figure>
        <div class="content">
            <p>${place.description}</p>
            <address>${place.address}</address>
        </div>
        <button type="button">Learn More</button>
        `;
        discoverGrid.append(card);
    });
};


/*
*Display a message based on the visitor's last visit date
*/ 
const displayVisitMessage = () => { 
    const lastVisit = Number(localStorage.getItem("lastVisit"));
    const now = Date.now();

    let message;

    // First-time visiter
    if (!lastVisit) {
        message = "Welcome! lets us Know if you have any questions"
    } else {
        // Calculate full days since last visit
        const daysBetween = Math.floor(
            (now - lastVisit) / (100 * 60 * 60 * 24)
        );
        
        if (daysBetween < 1) {
            message = "Back so soon! Awesome!"
        }
        else {
            message = `You last visited ${daysBetween} ${daysBetween === 1 ? "day" : "days"} ago.`;
        }
    }
    visitMessage.textContent = message
    // Store current visit timestamp
    localStorage.setItem("lastVisit", now);
};

displayVisitMessage();
displayPlaces();