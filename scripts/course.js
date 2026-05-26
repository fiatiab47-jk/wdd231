const coursesArray = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// =============== Selectors =================
const courseGrid = document.getElementById('course-cards');
const creditCount = document.getElementById('creditCount');
const filterButtons = document.querySelectorAll('.filter-btn');
const courseDetails = document.getElementById('course-details');

// ================ Modal Function ==================
const displayCourseDetails = (course) => {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    <p><strong>Status</strong>: ${course.completed ? '✅ Completed' : '🔄 In Progress'}</p>
    `;

    courseDetails.showModal();
    document.getElementById('closeModal').addEventListener("click", () => {
        courseDetails.close();
    });  

    courseDetails.addEventListener('click', (e) => {
    if (e.target === courseDetails) {
        courseDetails.close();
        }
    });
}



// Render course card for a given array
// ============= Function =============
const renderCourses = (courses) => {
    courseGrid.innerHTML = '';

    courses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }
        
        card.innerHTML = `<span class="course-num">${course.subject} ${course.number}</span>`;

        card.addEventListener('click', () => {
        displayCourseDetails(course);
        });

        courseGrid.appendChild(card);
    });

    // Updated credit total using reduce
    const total = coursesArray.reduce((sum, c) => sum + c.credits, 0);
    creditCount.textContent = total;
};


// ============ Filter Logic ============
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        // Remove active class form all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Add active to clicked button
        const filter = btn.dataset.filter;
        
        let filtered;
        if (filter === 'all') {
            filtered = coursesArray;
        }
        else {
            filtered = coursesArray.filter(c => c.subject === filter);
        }
        renderCourses(filtered);
    });
});



// ============= Trials ================
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Operation was successful");
        } else {
            reject("Operation failed.")
        }
    }, 5000);
});
myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error));

const myAsyncFunction = async () => {
    try {
        const value = await myPromise;
        console.log(value);

        // Fetch data after the promise resolves
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Initial render all courses
renderCourses(coursesArray);
myAsyncFunction();