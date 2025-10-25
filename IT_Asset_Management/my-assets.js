document.addEventListener("DOMContentLoaded", function () {
  const myAssetsTableBody = document.querySelector("#myAssetsTable tbody");
  const currentUser = localStorage.getItem("currentUser") || "User";

  function loadMyAssets() {
    const assets = JSON.parse(localStorage.getItem("assets")) || [];
    const myAssets = assets.filter((a) => a.assignedTo === currentUser);

    myAssetsTableBody.innerHTML = "";

    myAssets.forEach((asset) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${asset.id}</td>
        <td>${asset.name}</td>
        <td>${asset.category}</td>
        <td>${asset.purchaseDate}</td>
        <td>${asset.status}</td>
        <td><button class="btn return-btn" data-id="${asset.id}">Return</button></td>
      `;
      myAssetsTableBody.appendChild(tr);
    });

    document.querySelectorAll(".return-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number(this.getAttribute("data-id"));
        let assets = JSON.parse(localStorage.getItem("assets")) || [];
        const asset = assets.find((a) => a.id === id);

        if (asset && asset.assignedTo === currentUser) {
          const confirmReturn = confirm(`Return asset "${asset.name}"?`);
          if (confirmReturn) {
            asset.status = "Available";
            asset.assignedTo = "";
            localStorage.setItem("assets", JSON.stringify(assets));
            loadMyAssets();
            alert("🔄 Asset returned successfully!");
          }
        }
      });
    });
  }

  loadMyAssets();
});
