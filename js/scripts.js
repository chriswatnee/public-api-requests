// Stores user data
let users = [];

// DOM element selection
const galleryDiv = document.querySelector("#gallery");

// Display user modal
function displayUserModal(user) {
  const getFormattedDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-US");
  const userModalHTML = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${user.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.cell}</p>
          <p class="modal-text">${user.location.street.number} ${user.location.street.name},  ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
          <p class="modal-text">Birthday: ${getFormattedDate(user.dob.date)}</p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", userModalHTML);
}

// Add a click event listener to the #gallery div
galleryDiv.addEventListener("click", (e) => {
  // Find the nearest ancestor element with the class card
  const userCard = e.target.closest(".card");
  // If a user card was not clicked then stop code from executing
  if (!userCard) {
    return;
  }
  // Get the user's email from the card's email data attribute
  const userEmail = userCard.dataset.email;
  // Get the user from the email
  const user = users.find((user) => user.email === userEmail);
  // Display modal for user
  displayUserModal(user);
});

// Display users
function displayUsers(users) {
  // Iterate over the users array
  users.forEach((user) => {
    // Card HTML string
    const userHTML = `
      <div class="card" data-email="${user.email}">
        <div class="card-img-container">
          <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
      </div>
    `;
    // Insert the HTML into the #gallery div
    galleryDiv.insertAdjacentHTML("beforeend", userHTML);
  });
}

// Get 12 random users
async function getUsers() {
  // URL for the API endpoint
  const url = "https://randomuser.me/api/?results=12&nat=us";
  try {
    const response = await fetch(url);
    // Check if the request was successful
    if (!response.ok) {
      // Throw an error with the status message
      throw new Error(`Response status: ${response.status}`);
    }
    // Parse the response body as JSON
    const data = await response.json();
    // Set users array and display users
    users = data.results;
    displayUsers(users);
  } catch (error) {
    // Catch any errors
    console.log(error.message);
  }
}

getUsers();