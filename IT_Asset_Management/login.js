document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const errorMsg = document.getElementById("error-msg");

  // Predefined credentials
  const adminCreds = { username: "admin", password: "admin123" };
  const userCreds = { username: "user", password: "user123" };

  if(role === "admin") {
    if(username === adminCreds.username && password === adminCreds.password) {
      localStorage.setItem("currentUser", "Admin");
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = " Invalid Admin credentials!";
    }
  } 
  else if(role === "user") {
    if(username === userCreds.username && password === userCreds.password) {
      localStorage.setItem("currentUser", "User");
      window.location.href = "user-dashboard.html";
    } else {
      errorMsg.textContent = " Invalid User credentials!";
    }
  } 
  else {
    errorMsg.textContent = " Please select a role!";
  }
});
