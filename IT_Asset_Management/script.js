const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("currentUser"); 
    alert("You have logged out!");
    window.location.href = "index.html";
  });
}
const total = 10;
const available = 6;
const assigned = 3;
const damaged = 1;
if (document.getElementById("totalAssets")) {
  document.getElementById("totalAssets").textContent = total;
  document.getElementById("availableAssets").textContent = available;
  document.getElementById("assignedAssets").textContent = assigned;
  document.getElementById("damagedAssets").textContent = damaged;
}