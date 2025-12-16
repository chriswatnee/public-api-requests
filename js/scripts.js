let users = [];

// Display users
function displayUsers(users) {
  // DOM element selection
  const galleryDiv = document.querySelector("#gallery");
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