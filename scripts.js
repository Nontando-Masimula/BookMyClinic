let currentIndex = 0; // Initialize current index for images
const imagesContainer = document.querySelector('.slider-images');
const images = document.querySelectorAll('.slider-images img');

// Clone the first image and append it to the end
const firstImage = images[0].cloneNode(true);
imagesContainer.appendChild(firstImage);

const totalImages = images.length; // Update total images count

function showNextImage() {
    currentIndex++;
    // Calculate the offset
    const offset = -currentIndex * (100 / totalImages); // Adjust for the total number of images
    imagesContainer.style.transition = 'transform 0.5s ease'; // Add transition for smooth sliding
    imagesContainer.style.transform = `translateX(${offset}%)`; // Move images

    // Reset to the first image when the last image is reached
    if (currentIndex >= totalImages) {
        currentIndex = 0;
        setTimeout(() => {
            imagesContainer.style.transition = 'none'; // Remove transition for instant reset
            imagesContainer.style.transform = 'translateX(0)'; // Reset position
        }, 500); // Match the timeout duration with the transition duration
    }
}

// Slide every 3 seconds
setInterval(showNextImage, 3000);
 // Change image every 3 seconds



// Check login status from localStorage
function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

// Handle the Book button click
document.getElementById('book-btn').addEventListener('click', function() {
    const clinicSelect = document.getElementById('clinic-select').value;

    if (!isLoggedIn()) {
        // Save the current page location before redirecting to login
        localStorage.setItem('redirectTo', 'booking');
        alert('Please log in to book an appointment.');
        window.location.href = 'login.html';  // Redirect to login page
    } else if (!clinicSelect) {
        // If no clinic is selected
        alert('Please select a clinic location.');
    } else {
        // If logged in and clinic is selected, proceed to booking form
        alert(`You have selected ${clinicSelect}. Proceed to booking.`);
        window.location.href = 'booking-form.html';  // Redirect to booking form
    }
});


// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function() {
    const selectedClinic = document.getElementById('clinic-select').value;
    if (selectedClinic) {
        document.getElementById('clinic-results').classList.remove('hidden');
        document.getElementById('clinic-list').innerHTML = `<div class="clinic"><h3>${selectedClinic}</h3><p>Details about ${selectedClinic}...</p><button>Book Appointment</button></div>`;
    } else {
        alert('Please select a clinic location.');
    }
});


//------------------------login--------------------------
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html'; // Redirect to main page
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});


// Handle form submission
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    // Simple registration logic (could be more complex with validation)
    const name = document.getElementById('reg-name').value;
    const surname = document.getElementById('reg-surname').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    // Simulating successful registration
    if (name && surname && email && password) {
        alert('Registration successful! Welcome to QuickCare.');
        window.location.href = "login.html"; // Redirect to login page after successful registration
    }
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Basic validation (replace this with actual logic)
    if (email === 'test@example.com' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');  // Store login status
        alert('Login successful!');

        // Check if we need to redirect to the booking section
        const redirectTo = localStorage.getItem('redirectTo');
        if (redirectTo === 'booking') {
            localStorage.removeItem('redirectTo');  // Clear redirect flag
            window.location.href = 'index.html';  // Redirect back to booking
        } else {
            window.location.href = 'index.html';  // Redirect to home if no specific page
        }
    } else {
        document.getElementById('login-error').classList.remove('hidden');
        document.getElementById('login-error').innerText = 'Invalid email or password.';
    }
});