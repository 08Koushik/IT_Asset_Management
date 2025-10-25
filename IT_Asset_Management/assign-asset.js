document.addEventListener("DOMContentLoaded", function () {
  const assetSelect = document.getElementById("assetSelect");
  const assignForm = document.getElementById("assignForm");

  
  function loadAssets() {
    const assets = JSON.parse(localStorage.getItem("assets")) || [];
    assetSelect.innerHTML = '<option value="">-- Select Asset --</option>';

    assets.forEach(asset => {
      if (asset.status === "Available") {
        const option = document.createElement("option");
        option.value = asset.id;
        option.textContent = `${asset.name} (${asset.category})`;
        assetSelect.appendChild(option);
      }
    });
  }

  
  if (assignForm) {
    assignForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const selectedAssetId = Number(assetSelect.value);
      const employeeName = document.getElementById("employeeName").value.trim();

      if (!selectedAssetId || !employeeName) {
        alert("Please select an asset and enter employee name.");
        return;
      }

      const assets = JSON.parse(localStorage.getItem("assets")) || [];
      const asset = assets.find(a => a.id === selectedAssetId);

      if (asset) {
        asset.assignedTo = employeeName;
        asset.status = "Assigned";

        localStorage.setItem("assets", JSON.stringify(assets));
        alert(` ${asset.name} assigned to ${employeeName}`);
        assignForm.reset();
        loadAssets(); 
      }
    });
  }

  loadAssets();
});
