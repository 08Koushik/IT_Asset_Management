document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#myAssetsTable tbody");
  const requestTableBody = document.querySelector("#requestStatusTable tbody");
  const currentUser = localStorage.getItem("currentUser") || "User";

  // Loads assets that are currently assigned to the user
  function loadMyAssets() {
    fetch('/api/assets')
      .then(res => res.json())
      .then(assets => {
        const myAssets = assets.filter(a => a.assignedTo === currentUser);
        tableBody.innerHTML = myAssets.map(asset => `
          <tr>
            <td>${asset.id}</td>
            <td>${asset.name}</td>
            <td>${asset.category}</td>
            <td>${asset.status}</td>
            <td><button class="btn" onclick="returnAsset(${asset.id})">Return</button></td>
          </tr>
        `).join('');
      })
      .catch(err => console.error("Error loading assigned assets:", err));
  }

  // Loads the history of asset requests made by the user to show Approved/Declined status
  function loadRequestStatus() {
    // Note: Ensure the /api/requests/all endpoint is added to your RequestController
    fetch('/api/requests/all')
      .then(res => res.json())
      .then(requests => {
        const myRequests = requests.filter(r => r.requestedBy === currentUser);
        requestTableBody.innerHTML = myRequests.map(req => `
          <tr>
            <td>${req.assetName}</td>
            <td><span class="status-${req.status.toLowerCase()}">${req.status}</span></td>
          </tr>
        `).join('');
      })
      .catch(err => console.error("Error loading request history:", err));
  }

  // Function to return an asset back to the available pool
  window.returnAsset = function(id) {
    if (confirm("Are you sure you want to return this asset?")) {
      fetch(`/api/assets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Available", assignedTo: "" })
      }).then(() => {
        alert("Asset returned successfully!");
        loadMyAssets();
      })
      .catch(err => console.error("Error returning asset:", err));
    }
  };

  // Initialize both tables on page load
  loadMyAssets();
  loadRequestStatus();
});