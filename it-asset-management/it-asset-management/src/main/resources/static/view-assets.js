function loadAssets() {
  fetch('/api/assets')
    .then(res => res.json())
    .then(assets => {
      const tbody = document.querySelector("#assetsTable tbody");
      tbody.innerHTML = assets.map(a => `
        <tr>
          <td>${a.id}</td>
          <td>${a.name}</td>
          <td>${a.status}</td>
          <td><button onclick="deleteAsset(${a.id})">Delete</button></td>
        </tr>
      `).join('');
    });
}

function deleteAsset(id) {
  fetch(`/api/assets/${id}`, { method: 'DELETE' }).then(() => loadAssets());
}

loadAssets();