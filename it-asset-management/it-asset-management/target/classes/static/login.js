// src/main/resources/static/login.js
document.getElementById("loginForm").addEventListener("submit", function(e) {
    const username = document.querySelector('input[name="username"]').value;

    // Save the username locally so the User Dashboard knows who is logged in
    localStorage.setItem("username", username);

    const form = e.target;
    form.action = "/perform_login";
    form.method = "POST";
});