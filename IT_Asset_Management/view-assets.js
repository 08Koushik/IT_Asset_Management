document.addEventListener("DOMContentLoaded", function () {
  const assetsTableBody = document.querySelector("#assetsTable tbody");

  function loadAssets() {
    const assets = JSON.parse(localStorage.getItem("assets")) || [];
    assetsTableBody.innerHTML = "";

    assets.forEach((asset) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${asset.id}</td>
        <td>${asset.name}</td>
        <td>${asset.category}</td>
        <td>${asset.purchaseDate}</td>
        <td>${asset.status}</td>
        <td>${asset.assignedTo || "-"}</td>
        <td>
          <button class="action-btn edit" data-id="${asset.id}">Edit</button>
          <button class="action-btn delete" data-id="${asset.id}">Delete</button>
          ${
            asset.status === "Assigned"
              ? `<button class="action-btn return" data-id="${asset.id}">Return</button>`
              : ""
          }
        </td>
      `;

      assetsTableBody.appendChild(tr);
    });

    addActionListeners();
  }

  function addActionListeners() {
    // Delete button
    const deleteButtons = document.querySelectorAll(".action-btn.delete");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number(this.getAttribute("data-id"));
        let assets = JSON.parse(localStorage.getItem("assets")) || [];
        assets = assets.filter((asset) => asset.id !== id);
        localStorage.setItem("assets", JSON.stringify(assets));
        loadAssets();
        alert("✅ Asset deleted successfully!");
      });
    });

    // Edit button
    const editButtons = document.querySelectorAll(".action-btn.edit");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number(this.getAttribute("data-id"));
        const assets = JSON.parse(localStorage.getItem("assets")) || [];
        const asset = assets.find((a) => a.id === id);

        if (asset) {
          const newName = prompt("Enter new asset name:", asset.name) || asset.name;
          const newCategory = prompt("Enter new category:", asset.category) || asset.category;
          const newStatus = prompt("Enter new status (Available/Assigned/Damaged):", asset.status) || asset.status;

          asset.name = newName;
          asset.category = newCategory;
          asset.status = newStatus;

          localStorage.setItem("assets", JSON.stringify(assets));
          loadAssets();
          alert("✅ Asset updated successfully!");
        }
      });
    });

    // ✅ Return button (New feature)
    const returnButtons = document.querySelectorAll(".action-btn.return");
    returnButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number(this.getAttribute("data-id"));
        const assets = JSON.parse(localStorage.getItem("assets")) || [];
        const asset = assets.find((a) => a.id === id);

        if (asset && asset.status === "Assigned") {
          const confirmReturn = confirm(`Return asset "${asset.name}" from ${asset.assignedTo}?`);
          if (confirmReturn) {
            asset.status = "Available";
            asset.assignedTo = "";
            localStorage.setItem("assets", JSON.stringify(assets));
            loadAssets();
            alert("🔄 Asset returned successfully!");
          }
        }
      });
    });
  }

  loadAssets();
});
