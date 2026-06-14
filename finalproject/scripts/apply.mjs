import { setFooterDates, setupNavigation } from "./common.mjs";

// ===================================
// Initialize shared functionality
// ===================================
// Display current year and last modified date
setupNavigation();

// Enable hamburger menu navigation
setFooterDates();


// Generate Hidden Submission Timestamp
// =====================================
// Select the hidden timestamp
const timestampField = document.querySelector('#timestamp');

// only run if field exists on the page
if (timestampField) {
    // Store the current date and time
    timestampField.value = new Date().toLocaleString("en-GH", {
        dateStyle: "short",
        timeStyle: "short"
    });
}


// ========================================
// Form Auto-Suggestions using localStorage
// ========================================
// Select the application form
const form = document.querySelector('#apply-form');

// Prevent errors if form is missing
if (form) {
    // Select all inputs
    const inputs = form.querySelectorAll('input, select');

    // loop through the selected fields
    inputs.forEach((input) => {
        
        // Save the user input whenever it changes
        input.addEventListener('input', () => {

            // Retrieve the previous values form localStorage
            // If none exist, start with an empty array
            const savedValues = JSON.parse(localStorage.getItem(input.name) || '[]');

            // Save if field has a values and is already not in the list
            if (input.value && !savedValues.includes(input.value)) {

                // Add latest value to the front of the list
                savedValue.unshift(input.value);

                // Keep at most 3 most recent values
                savedValue.splice(3);

                // Save back to localStorage
                localStorage.setItem(input.name, JSON.stringify(savedValues));
            }

            // check if a datalist already exists
            let datalist = document.getElementById(`list-${input.name}`);

            // Create one of necessary
            if (!datalist) {
                datalist = document.createElement('datalist');

                // unique id per field
                datalist.id = `list-${input.name}`;

                // Insert datalist after the input
                input.after(datalist);

                // Connect the input to the datalist
                input.setAttribute('list', datalist.id);
            }
            
            // Populate datalist suggestions
            datalist.innerHTML = savedValues.map(value => `
                <option value="${value}">`.join(''));
        });    
    });

    // ============================
    //    Handle FormSubmission
    // ============================

    // Cleanup the local form after a successful form submission.
    form.addEventListener('submit', (e) => {
        // Prevent the default immediately after form 
        // submission so we can process data first
        e.preventDefault();

        // Capture all form field values
        const formData = new FormData(form);

        // Convert to URL query string (e.g. firsName=Kwame&lastName=Mensah)
        const param = new URLSearchParams(formData);
        
        // Build the full redirect URL with params appended
        const redirectURL = `thank-you.html?${param.toString()}`;
        
        // Wait for 3 seconds, then redirect to your thank you page
        setTimeout(() => {
            // Reset the fields visually
            form.reset();

            window.location.href = redirectURL;
        }, 2000);
    });
}