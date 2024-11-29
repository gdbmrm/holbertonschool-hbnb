/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

const places = [
  { name: "Beautiful Beach House", price: 150, image: "beach-villa.jpg", description: "A cozy beachfront villa." },
  { name: "Cozy Cabin", price: 100, image: "cabin.jpg", description: "A warm cabin in the woods." },
  { name: "Modern Apartment", price: 200, image: "apartment.jpg", description: "A sleek apartment in the city center." }
];


document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          await loginUser(email, password);
      });
  }
});

async function loginUser(email, password) {
  try {
    console.log('Sending request with:', { email, password });
    const response = await fetch('http://127.0.0.1:5500/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    console.log('Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.access_token}; path=/`;
      window.location.href = 'index.html';
    } else {
        const errorMessage = await response.text();
        alert('Login failed: ' + errorMessage);
    }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
}

function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
      loginLink.style.display = 'block';
  } else {
      loginLink.style.display = 'none';
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
  const response = await fetch('http://localhost:5500/v1/places/', {
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
