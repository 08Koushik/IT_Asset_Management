document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#availableAssetsTable tbody");
  const currentUser = localStorage.getItem("currentUser") || "User";

  function loadAvailable() {
    fetch('/api/assets')
      .then(res => res.json())
      .then(assets => {
        const available = assets.filter(a => a.status === "Available");
        tableBody.innerHTML = available.map(asset => `
          <tr>
            <td>${asset.id}</td>
            <td>${asset.name}</td>
            <td>${asset.category}</td>
            <td>${asset.status}</td>
            <td><button class="btn" onclick="requestAsset(${asset.id})">Request</button></td>
          </tr>
        `).join('');
      });
  }

  window.requestAsset = function(id) {
    if (confirm("Request this asset for yourself?")) {
      fetch(`/api/assets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Assigned", assignedTo: currentUser })
      }).then(() => {
        alert("Requested successfully!");
        loadAvailable();
      });
    }
  };
  loadAvailable();
});