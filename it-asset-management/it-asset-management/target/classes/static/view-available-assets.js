document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#availableAssetsTable tbody");
  const currentUser = localStorage.getItem("currentUser") || "User";

  function loadAvailable() {
    fetch('/api/assets')
      .then(res => res.json())
      .then(assets => {
        const available = assets.filter(a => a.status && a.status.toLowerCase() === "available");

        if (available.length === 0) {
          tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No available assets found.</td></tr>';
          return;
        }

        tableBody.innerHTML = available.map(asset => `
          <tr>
            <td>${asset.id}</td>
            <td>${asset.name}</td>
            <td>${asset.category}</td>
            <td>${asset.status}</td>
            <td>
              <button class="btn" onclick="requestAsset(event, ${asset.id}, '${asset.name}')">Request</button>
            </td>
          </tr>
        `).join('');
      });
  }

  // Added 'event' parameter to access the specific button clicked
  window.requestAsset = function(event, id, assetName) {
    const button = event.target;

    if (confirm(`Request "${assetName}" for yourself?`)) {
      fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assetName: assetName,
          requestedBy: currentUser
        })
      }).then(response => {
        if (response.ok) {
            button.textContent = "Requested";
            button.disabled = true;
            button.style.background = "rgba(16,185,129,0.15)"; // Soft green glassmorphism
            button.style.color = "var(--success)";
            button.style.border = "1px solid rgba(16,185,129,0.3)";
            alert("Request sent successfully!");
        }
      });
    }
  };

  loadAvailable();
});