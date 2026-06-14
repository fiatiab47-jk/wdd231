// main.js
// The entry point for index.html
// Import calls all modules needed on the homepage
// This file is loaded in index.html
// ==========================================================

import { setFooterDates } from "./common.mjs";

import { loadWeather } from "./weather.mjs";

// Functions needed to display Featured Jobs
import { getJobs, getFeaturedJobs, displayJobs, setupJobModalEvents } from "./jobs.mjs"; 

// DomContentLoaded
// Waits for the HTML to fully load before running any JS.
// This ensures all elements are in the DOM before we try
// to select or manipulate them.
// ===========================================================
document.addEventListener('DOMContentLoaded', async () => {
    // Set the current year and the last modified date in the footer
    setFooterDates();

    // Set up the hamburger menu toggle for mobile navigation
    // setupNavigation();

    // Fetch and display the visitor's local weather 
    // This calls navigator.geolocation then hits the OpenWeatherMap API
    loadWeather();

    try{
        // fetch all jobs
        const jobs = await getJobs();
        const count = 6; 

        // Select 6 random featured jobs
        const featuredJobs = getFeaturedJobs(jobs, count);

        // Select featured jobs container element
        const featuredContainer = document.querySelector("#featured-jobs-container");
        // Render featured jobs
        displayJobs(featuredJobs, featuredContainer);

        setupJobModalEvents(featuredJobs, featuredContainer);

    }catch (error) {
        console.error("Error loading featured jobs:", error);
    }
});