import { getCurrentUser, removeUser } from "./login.js";

let nav = document.querySelector("nav")
if(getCurrentUser()) {
  nav.innerHTML = `
   <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="#logout" id="logout">Logout</a></li>
    </ul>
  `
} else {
  nav.innerHTML = `
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="login.html">Login</a></li>
    <li><a href="register.html">Register</a></li>
  </ul>
  `
}

let logoutBtn = document.getElementById("logout")
logoutBtn.addEventListener('click', removeUser)


export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  if (response.ok) {
    return await response.json(); 
  } else {
    throw await response.json();
  }
}
