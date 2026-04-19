// src/main/resources/static/view-assets.js
// src/main/resources/static/view-assets.js
function loadAssets() {
    fetch('/api/assets')
        .then(res => res.json())
        .then(assets => {
            const tbody = document.getElementById("assetTableBody");
            tbody.innerHTML = assets.map(a => `
                <tr>
                    <td>${a.id}</td>
                    <td>${a.name}</td>
                    <td>${a.category}</td>
                    <td>${a.status}</td>
                    <td>${a.assignedTo || "-"}</td>
                    <td>
                        <button class="btn-delete" onclick="deleteAsset(${a.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        });
}

function deleteAsset(id) {
  if (confirm("Are you sure you want to delete this asset?")) {
    fetch(`/api/assets/${id}`, { method: 'DELETE' })
      .then(() => loadAssets());
  }
}

loadAssets();