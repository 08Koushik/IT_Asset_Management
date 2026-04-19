document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const role = document.getElementById("role").value;
  const user = document.getElementById("username").value;

  // Basic simulation of login logic
  localStorage.setItem("currentUser", user);
  if(role === "admin") window.location.href = "dashboard.html";
  else window.location.href = "user-dashboard.html";
});