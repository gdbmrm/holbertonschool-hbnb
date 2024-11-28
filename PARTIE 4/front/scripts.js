/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            async function loginUser(email, password) {
              const response = await fetch('https://your-api-url/login', {
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
})});

function getCookie(name) {
  // Function to get a cookie value by its name
  // Your code here
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

