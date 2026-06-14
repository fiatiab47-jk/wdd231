//=============================
//  Jobs Statistics
// ============================
export function displayStats(jobs) {
    document.querySelector('#total-jobs').textContent = jobs.length;
    
    document.querySelector('#remote').textContent =
        jobs.filter(job => job.type === 'Remote').length;
    
    document.querySelector('#total-categories').textContent =
        new Set(jobs.map(job => job.category)).size;  
}


//=============================
//  Populate Filter DropDown
// ============================

// Display summary information about the 
// jobs currently loaded from JSON
export function populateFilters(jobs) {
    
    //select filter dropdowns
    const categoryFilter =
        document.querySelector('#category-filter');
    
    const typeFilter =
        document.querySelector('#type-filter');

    // Extract unique categories
    [...new Set(jobs.map(job => job.category))]
        .forEach(category => {

            // Add category option
            categoryFilter.innerHTML +=
                `<option value="${category}">
                    ${category}
                </option>`;
        });

        // Extract unique job types
    [...new Set(jobs.map(job => job.type))]
        .forEach(type => {
            
            // Add category option
            typeFilter.innerHTML +=
                `<option value="${type}">
                    ${type}
                </option>`;
        });
}


//=============================
//  Search and Filters Jobs
// ============================

// Listens for user input and updates
// the displayed jobs instantly 
export function setupFilters(jobs, displayJobs) {

    // Select Filter Control
    const search = document.querySelector('#search-input');

    const category = document.querySelector('#category-filter');

    const type = document.querySelector('#type-filter');

    // Runs whenever a filter changes
    function filterJobs() {

        // convert search text to lower case 
        // for case-insensitive matching
        const keyword = search.value.toLowerCase();

        // Create an array containing
        // only jobs that satisfy all filters 
        const filteredJobs = jobs.filter(job => {

            // Match keyword against job title or company name
            const matchesKeyword =
                job.title.toLowerCase().includes(keyword) ||

                job.company.toLowerCase().includes(keyword);
            
            const matchesCategory = category.value === 'all' ||
                job.category === category.value;
            
            const matchesTypes = type.value === 'all' ||
                job.type === type.value;
            
            // Job must pass All checks
            return (
                matchesKeyword &&
                matchesCategory &&
                matchesTypes
            );
        });
        // Re-render only the matching jobs
        displayJobs(filteredJobs);
    }

    // Search while typing
    search.addEventListener('input', filterJobs);

    // Filter when category changes
    category.addEventListener('change', filterJobs);

    // Filter when job type changes
    type.addEventListener('change', filterJobs);

}