// src/main/resources/static/register.js
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const msgElement = document.getElementById("reg-msg");

    const userData = {
        username: username,
        password: password
        // Role is not sent from frontend anymore
    };

    fetch('/api/public/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            alert("Registration successful!");
            window.location.href = "index.html";
        } else {
            return response.text().then(text => { throw new Error(text) });
        }
    })
    .catch(error => {
        msgElement.style.color = "red";
        msgElement.textContent = error.message;
    });
});