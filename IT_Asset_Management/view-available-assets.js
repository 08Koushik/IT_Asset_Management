document.addEventListener("DOMContentLoaded", function () {
  const availableAssetsTableBody = document.querySelector("#availableAssetsTable tbody");
  const currentUser = localStorage.getItem("currentUser") || "User";

  function loadAvailableAssets() {
    const assets = JSON.parse(localStorage.getItem("assets")) || [];
    const availableAssets = assets.filter((a) => a.status === "Available");

    availableAssetsTableBody.innerHTML = "";

    availableAssets.forEach((asset) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${asset.id}</td>
        <td>${asset.name}</td>
        <td>${asset.category}</td>
        <td>${asset.purchaseDate}</td>
        <td>${asset.status}</td>
        <td><button class="btn request-btn" data-id="${asset.id}">Request</button></td>
      `;
      availableAssetsTableBody.appendChild(tr);
    });

    document.querySelectorAll(".request-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number(this.getAttribute("data-id"));
        let assets = JSON.parse(localStorage.getItem("assets")) || [];
        const asset = assets.find((a) => a.id === id);

        if (asset && asset.status === "Available") {
          const confirmReq = confirm(`Request asset "${asset.name}"?`);
          if (confirmReq) {
            asset.status = "Assigned";
            asset.assignedTo = currentUser;
            localStorage.setItem("assets", JSON.stringify(assets));
            loadAvailableAssets();
            alert(" Request successful! Asset assigned to you.");
          }
        }
      });
    });
  }

  loadAvailableAssets();
});
