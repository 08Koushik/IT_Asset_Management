document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  // Dummy credentials
  if (username === "admin" && password === "admin123") {
    alert("Login successful!");
    window.location.href = "dashboard.html"; // redirect to dashboard
  } else {
    errorMsg.textContent = "Invalid username or password!";
  }
});

// Logout function
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function() {
    alert("You have logged out!");
    window.location.href = "index.html";
  });
}

// Sample asset count (for now — static)
const total = 10;
const available = 6;
const assigned = 3;
const damaged = 1;

// Display the counts if on dashboard
if (document.getElementById("totalAssets")) {
  document.getElementById("totalAssets").textContent = total;
  document.getElementById("availableAssets").textContent = available;
  document.getElementById("assignedAssets").textContent = assigned;
  document.getElementById("damagedAssets").textContent = damaged;
}



