document.addEventListener("DOMContentLoaded", function() {
    let logform = document.getElementById("logform");

    logform.addEventListener('submit', register);

    function register(e) {
        e.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;

    }

    // code to add event listener to login form
    function login(e) {
        // your code to read in login form
    }

    // code to add event listener to third form of some kind
    function someOtherFunction(e) {
        // your code to read in your third form
    }
});
