let users = [];

// Display Users
function displayUsers(users) {
  const galleryDiv = document.querySelector("#gallery");
  users.forEach((user) => {
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
    galleryDiv.insertAdjacentHTML("beforeend", userHTML);
  });
}

// Get 12 Random Users
async function getUsers() {
  const url = "https://randomuser.me/api/?results=12&nat=us";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    users = data.results;
    displayUsers(users);
  } catch (error) {
    console.log(error.message);
  }
}

getUsers();