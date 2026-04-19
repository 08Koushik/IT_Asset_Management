// src/main/resources/static/assign-asset.js
document.addEventListener("DOMContentLoaded", function () {
  const assetSelect = document.getElementById("assetSelect");
  const assignForm = document.getElementById("assignForm");

  function loadAvailableAssets() {
    fetch('/api/assets')
      .then(res => res.json())
      .then(assets => {
        assetSelect.innerHTML = '<option value="">-- Select Asset --</option>';
        assets.filter(a => a.status === "Available").forEach(asset => {
          const option = document.createElement("option");
          option.value = asset.id;
          option.textContent = `${asset.name} (${asset.category})`;
          assetSelect.appendChild(option);
        });
      });
  }

  assignForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = assetSelect.value;
    const employee = document.getElementById("employeeName").value.trim();

    fetch(`/api/assets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "Assigned", assignedTo: employee })
    }).then(() => {
      alert("Asset assigned successfully!");
      window.location.href = "dashboard.html";
    });
  });

  loadAvailableAssets();
});