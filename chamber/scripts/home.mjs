// Navigation and Footer
import { setFooterDates, displayMembers } from './directory.js';


import { loadWeather } from './weather.mjs'

console.log('home loaded');

// setupNavigation();
setFooterDates();
loadWeather();

const membersContainer = document.querySelector('#members-container');

// Load Spotlights
const loadSpotlights = async () => {
    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }

        const data = await response.json();
        // Gold + Silver Only
        const qualifiedMembers = data.members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const randomMembers = shuffleArray(qualifiedMembers).slice(0, 3);
        displayMembers(membersContainer, randomMembers);

    } catch (error) {
        console.error(`Spotlight fetch failed:`, error);
    }
}

// ==========================
//  Shuffle Utility
// ==========================
function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

loadSpotlights();