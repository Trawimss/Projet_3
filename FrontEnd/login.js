document.addEventListener("DOMContentLoaded", ()=> {
  const loginURL = "http://localhost:5678/api/users/login";
  const formLogin = document.querySelector("form");
  formLogin.addEventListener("submit", (e) => {
   e.preventDefault()
    const email=document.querySelector('input[type="email"]').value
    const password=document.querySelector('input[type="password"]').value
    console.log(password)
    fetch(loginURL, {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({email,password})
       })
      .then(response => {
        if(response.ok){
          return response.json()
        }
        })
      .then(data => {
          // Stocker les informations d'authentification et rediriger
          sessionStorage.setItem('authToken', data.token);
         window.location.href="index.html"
      })
      .catch(error => {
        document.getElementById("errorlogin").textContent="Email ou mot de passe incorrect !"
      });
  });
});


