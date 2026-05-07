// Current Year
document.querySelector('#currentYear').textContent =
    new Date().getFullYear();

// Last modified Date
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;

    
console.log("date.js is working");