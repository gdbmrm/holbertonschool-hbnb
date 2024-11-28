/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            async function loginUser(email, password) {
              const response = await fetch('https://localhost:5000/v1/auth/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email, password })
              });
              if (response.ok) {
                const data = await response.json();
                document.cookie = `token=${data.access_token}; path=/`;
                window.location.href = 'index.html';
            } else {
                alert('Login failed: ' + response.statusText);
            }
          }
        });
    }
});

function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
      loginLink.style.display = 'block';
  } else {
      loginLink.style.display = 'none';
      // Fetch places data if the user is authenticated
      fetchPlaces(token);
  }
}

function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  
  for(let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      
      if(name == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

async function fetchPlaces(token) {
  const response = await fetch('https://localhost:5000/v1/places', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    });
    if (response.ok) {
      const data = await response.json();
      displayPlaces(data)
    }
  }

function displayPlaces(places) {
  const placesContainer = document.getElementById("place-details");
  placesContainer.innerHTML = "";

  for (const place of places) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <h3>${place.name}</h3>
    <p>${place.owner}</p>
    <p>${place.price}</p>
    <p>${place.description}</p>


  `;
    placesContainer.appendChild(newDiv);
  }
}
