document.addEventListener("DOMContentLoaded", function () {
  const assetForm = document.getElementById("assetForm");

  if (assetForm) {
    assetForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("assetName").value.trim();
      const category = document.getElementById("assetCategory").value.trim();
      const purchaseDate = document.getElementById("purchaseDate").value;
      const status = document.getElementById("assetStatus").value;

      if (!name || !category || !purchaseDate) {
        alert("Please fill all fields!");
        return;
      }

      const newAsset = {
        id: Date.now(),
        name,
        category,
        purchaseDate,
        status,
        assignedTo: ""
      };

      // Retrieve old assets from localStorage
      let assets = JSON.parse(localStorage.getItem("assets")) || [];
      assets.push(newAsset);

      // Save back to localStorage
      localStorage.setItem("assets", JSON.stringify(assets));

      alert("✅ Asset added successfully!");
      assetForm.reset();
    });
  }
});
