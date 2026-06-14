const jobModal = document.querySelector("#job-modal");


import { setFooterDates, setupNavigation } from "./common.mjs";
import { displayStats, populateFilters, setupFilters } from "./filter.mjs";

// Fetch all jobs form JSON file
export const getJobs = async () => { 
    try {
        const response = await fetch("./data/jobs.json");

        if (!response.ok) {
            throw new Error(`Failed to load jobs: ${response.status}`);
        }
        const jobs = await response.json();
        return jobs;
    } catch (error){
        console.error("Error loading jobs",error);
        return [];
    }
};

// Create a single job card for each job
// Returns an HTML element 
export function createJobsCard(job) {
    const card = document.createElement('article');

    card.classList.add("job-card");

    card.innerHTML = `
    <h3 class="company-name">${job.company}</h3>

    <img class="job-image" src="${job.image}"
    alt="${job.title} at ${job.company}"
    loading="lazy" width="300" height="200">
    
    <h4 class="job-title">${job.title}</h4>
    <p class="job-type">${job.type}</p>
    <p class="job-location">${job.location}</p>

    <button class="details-btn" data-id="${job.id}" type="button">View Details</button>
    `;   
    return card
}


// Display jobs in any job container
export const displayJobs = (jobs, container) => {
    // clear any previous content of the card and reload
    container.innerHTML = '';

    // Loop through each job
    jobs.forEach((job) => {
        // create a card for each job
        const card = createJobsCard(job);
        // Add the card to the container
        container.appendChild(card);
    });
};


// Handles clicks on View Details buttons
export function setupJobModalEvents(jobs, container) {
    // listen for click inside the container
    container.addEventListener('click', (e) => {

        // Find the closest details button
        const button = e.target.closest('.details-btn');

        // Stop if a details button wasn't clicked
        if (!button) return;

        // Get the job id from the button
        const jobId = Number(button.dataset.id);

        // Find the matching job object
        const selectedJob = jobs.find(job => job.id === jobId);

        displayJobDetails(selectedJob);
    });
}



// Return random featured jobs to be used on the homepage
// getFeaturedJobs will be import in main.mjs
export function getFeaturedJobs(jobs, count = 6) {
    const shuffledJobs = shuffleArray(jobs);
    
    // Return the exact number of featured jobs
    return shuffledJobs.slice(0, count);
}

// The spread operator (...) creates a copy of the array.
// The sort() method rearranges the items.
// Math.random generates a random number between 0 and 1.
// (- .5) produces a positive or negative value causing
// sort() to randomly change the order of items.
function shuffleArray(array) {
    // Return a randomly sorted copy of the array
    return [...array].sort(() => Math.random() - .5);
}



// ===============================
//       Build Modals
// ===============================
// Target the single modal element
// Function that populates and shows the modal
export const displayJobDetails = (job) => {
    // Build modal content using template literals
    jobModal.innerHTML = `
        <div class="modal-content">
        
            <button id="close-modal" aria-label="Close ${job.company} modal">❌ Close</button>
            <h2>${job.company}</h2>
            <h3>${job.title}</h3>

            <!-- Details -->
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <p><strong>Category:</strong> ${job.category}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Posted:</strong> ${job.posted}</p>

            <!-- Description -->
            <p class="job-description">${job.description}</p>
            
            <a href="apply.html?position=${encodeURIComponent(job.title)}"
                data-hover="Click Me" class="apply-btn">
                Apply for this Job
            </a>
        </div>
    `;

    // Show the Modal
    jobModal.showModal();

    // Close button logic
    const closeBtn = jobModal.querySelector("#close-modal");

    
    closeBtn.addEventListener('click', () => {
        jobModal.close();
    });
    
};



// ======================================================
//  Initializes Jobs Page After Dom Has Fully Loaded
// ======================================================
document.addEventListener('DOMContentLoaded', async () => {
    // Set the current year and the last modified date in the footer
    setFooterDates();

    // Set up the hamburger menu toggle for mobile navigation
    setupNavigation();

    
    // select the job container element
    const cardsContainer = document.querySelector("#cards-container");
    
    if (!cardsContainer) return;
    
    // Logs response to see if fetch is working
    const jobs = await getJobs();
    console.table(jobs);
    
    // Create cards and load to the container
    displayJobs(jobs, cardsContainer)
    
    // Enable View Details button functionality (Modal interaction)
    setupJobModalEvents(jobs, cardsContainer);
    
    // Display Stats
    displayStats(jobs);

    // Populate search and filtering
    populateFilters(jobs);

    // Enable search and filtering
    setupFilters(jobs, (filteredJobs) => {
        displayJobs(filteredJobs, cardsContainer)
    });
});