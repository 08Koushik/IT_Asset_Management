// src/main/resources/static/script.js

document.addEventListener("DOMContentLoaded", function () {
  // 1. Fetch Dashboard Stats
  fetch('/api/assets')
    .then(res => res.json())
    .then(data => {
      if (document.getElementById("totalAssets")) {
        document.getElementById("totalAssets").textContent = data.length;
      }
      if (document.getElementById("availableAssets")) {
        document.getElementById("availableAssets").textContent = data.filter(a => a.status === "Available").length;
      }
    })
    .catch(err => console.error("Error fetching stats:", err));

  // 2. Logout Logic
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      // Clear local storage (optional but recommended)
      localStorage.removeItem("currentUser");

      // Redirect to the Spring Security logout endpoint
      window.location.href = "/logout";
    });
  }
});