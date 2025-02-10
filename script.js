
document.getElementById('changeColorButton').addEventListener('click', function() {
    // color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    // Change the background color
    document.body.style.backgroundColor = randomColor;
});

// Function to fetch user data from the API and update the DOM
const fetchAndDisplayUsers = async () => {
    try {
        // Fetch data from the JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const users = await response.json();
        
        // Get the container to display user cards
        const userContainer = document.getElementById('userContainer');
        
        // Loop through each user and create a card for them
        users.forEach(user => {
            // Create a div for the user card
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            
            // Populate the card with user details
            userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            
            // Append the card to the container
            userContainer.appendChild(userCard);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

// Call the function on script load
fetchAndDisplayUsers();

document.getElementById('userForm').addEventListener('submit', function(event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Get form inputs
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error messages
    errorMessage.textContent = '';

    // Validation checks
    if (username === '') {
        errorMessage.textContent = 'Username is required.';
        return;
    }

    if (email === '') {
        errorMessage.textContent = 'Email is required.';
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    if (password === '') {
        errorMessage.textContent = 'Password is required.';
        return;
    } else if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters long.';
        return;
    }

    if (confirmPassword !== password) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // If all checks pass, submit the form
    alert('Form submitted successfully!');
    this.submit();
});


