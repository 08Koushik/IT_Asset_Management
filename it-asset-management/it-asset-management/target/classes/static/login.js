// src/main/resources/static/login.js
document.getElementById("loginForm").addEventListener("submit", function(e) {
    const username = document.querySelector('input[name="username"]').value;

    // Save the username locally so the User Dashboard knows who is logged in
   // src/main/resources/static/login.js
   localStorage.setItem("username", username);
   localStorage.setItem("currentUser", username); // Add this for compatibility with other scripts

    const form = e.target;
    form.action = "/perform_login";
    form.method = "POST";
});