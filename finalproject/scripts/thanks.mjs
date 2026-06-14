import { setFooterDates, setupNavigation } from "./common.mjs";

// ===================================
// Initialize shared functionality
// ===================================
// Display current year and last modified date
setupNavigation();

// Enable hamburger menu navigation
setFooterDates();


// ===================================
// Read Submitted Form Data
// ===================================

// Capture(e.g. thank-you.html?firsName=Kwame&lastName=Mensah)
const params = new URLSearchParams(window.location.search);

// Each object maps a URL parameter to an element on the page
const fields = [
    { param: 'firstName',       id: 'out-first-name'       },
    { param: 'lastName',        id: 'out-last-name'        },
    { param: 'email',           id: 'out-email'            },
    { param: 'phone',           id: 'out-phone'            },
    { param: 'desiredPosition', id: 'out-desired-position' },
    { param: 'experienceLevel', id: 'out-experience-level' },
    { param: 'timestamp',       id: 'out-timestamp'        },
];


fields.forEach(({ param, id }) => {
    // Find the element where the value should be displayed
    const el = document.getElementById(id);
    // Retrieve value from the query string so we modify it
    let value = params.get(param);

    // URLSearchParams retrieves the value attribute of selected
    // <option> instead of textContent of the option tags
    // Covert value into its readable equivalent
    if (param === 'experienceLevel') {
        
        // Maps the submitted option values to the innerText  
        const experienceMap = {
            entry: 'Entry Level',
            mid: 'Mid-Level',
            junior: 'Junior Levl',
            senior: 'Senior Level',
            lead: 'Lead / Manager'
        };

        // Look up the readable label using the submitted value.
        value = experienceMap[value] || value;
    }


    // Ensure the target element exist 
    // before attempting to write into it
    if (el) {
        // If value was passed in the URL, display 
        // it inside the span else just put "-" there 
        el.textContent = value ? value : '-';
    }
});