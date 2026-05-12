// URL
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

// Display each prophet as a card
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements 
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');

        // Populate heading with full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Build image attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        
        // Append heading and image to card
        card.appendChild(fullName);
        card.appendChild(portrait);

        // Append card to the card div
        cards.appendChild(card);
    });
};

// Fetch prophet data from JSON source
const getProphetData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data.prophets);    // uncomment to debug
        // Reference the prophets array of the JSON data object, not just the object
        displayProphets(data.prophets);
    } catch (error) {
        console.error('Error fetching prophet data:', error);
    }
}

getProphetData();

