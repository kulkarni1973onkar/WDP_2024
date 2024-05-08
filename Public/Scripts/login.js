let regform = document.getElementById("regform")

if(regform) regform.addEventListener('submit', register)

function register(e) {
  e.preventDefault()

  let fname = document.getElementById("fname").value
  let lastname = document.getElementById("lname").value
  let email = document.getElementById("email").value
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  let RPassword = document.getElementById("RPassword").value
  

  if (password !== RPassword) {
    document.querySelector(".error").innerText = "Passwords Must Match!"
    document.getElementById("password").value = ""
    document.getElementById("RPassword").value = ""
  } else {
    const user = {
      Username: username,
      Password: password,
      Email: email
    }
    
    fetchData('/users/register', user, 'POST')
      .then(data => {
        if (!data.message) {
          setCurrentUser(data)
          window.location.href = "login.html"
        }
      })
      .catch(err => {
        let error = document.querySelector(".error")
        error.innerHTML = `${err.message}`
      })

    document.getElementById("welcome").innerText = `Welcome ${username}!`
  }

}

let logform = document.getElementById("logform")

if(logform) logform.addEventListener('submit', login)

function login(e) {
  e.preventDefault()

  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  let email = document.getElementById("email").value
  


  const user = {
    Username: username,
    Password: password
  }
  // make a call to the server
  fetchData('/users/login', user, 'POST')
    .then(data => {
      if (!data.message) {
        setCurrentUser(data)
        window.location.href = "login.html"
      }
    })
    .catch(err => {
      let error = document.querySelector(".error")
      error.innerHTML = `${err.message}`
    })

  document.getElementById("welcome").innerText = `Welcome ${username}!`
}


// configuring local storage
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}

function removeUser() {
  localStorage.removeItem('user')
  window.location.href = 'login.html'
}
