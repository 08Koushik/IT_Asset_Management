document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/assets')
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalAssets").textContent = data.length;
      document.getElementById("availableAssets").textContent = data.filter(a => a.status === "Available").length;
    });
});