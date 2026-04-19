document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#myAssetsTable tbody");
  const currentUser = localStorage.getItem("currentUser") || "User";

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
      });
  }

  window.returnAsset = function(id) {
    if (confirm("Are you sure you want to return this asset?")) {
      fetch(`/api/assets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Available", assignedTo: "" })
      }).then(() => {
        alert("Asset returned successfully!");
        loadMyAssets();
      });
    }
  };
  loadMyAssets();
});