document.getElementById("assetForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const asset = {
    name: document.getElementById("assetName").value,
    category: document.getElementById("assetCategory").value,
    purchaseDate: document.getElementById("purchaseDate").value,
    status: document.getElementById("assetStatus").value,
    assignedTo: ""
  };

  fetch('/api/assets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asset)
  }).then(() => {
    alert("Saved!");
    window.location.href = "dashboard.html";
  });
});