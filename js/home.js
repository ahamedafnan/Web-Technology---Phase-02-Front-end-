import { requireAuth, getItems } from "./data.js";
import { attachLogout } from "./auth.js";
import { renderNavbarUser } from "./navbar-user.js";

requireAuth();
attachLogout("logoutBtn");
renderNavbarUser("navUserName", "navAvatar");

const items = getItems().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

const lostCount = items.filter(i => i.type === "lost").length;
const foundCount = items.filter(i => i.type === "found").length;

document.getElementById("lostCount").textContent = lostCount;
document.getElementById("foundCount").textContent = foundCount;

const grid = document.getElementById("recentGrid");

function cardHTML(it){
  const badge = it.type === "found"
    ? `<span class="badge badge-found">Found</span>`
    : `<span class="badge badge-lost">Lost</span>`;

  const img = it.photo || "https://picsum.photos/600/400?blur=2";
  return `
    <div class="col-md-4 col-lg-3">
      <div class="card p-3 h-100">
        <img class="img-cover mb-3" src="${img}" alt="item">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <div class="fw-bold text-truncate">${it.name}</div>
          ${badge}
        </div>
        <div class="small-muted">${it.location} • ${it.date}</div>
        <a class="btn btn-sm btn-outline-primary mt-3" href="details.html?id=${encodeURIComponent(it.id)}">View Details</a>
      </div>
    </div>
  `;
}

function render(list){
  grid.innerHTML = list.slice(0,8).map(cardHTML).join("") || `<div class="small-muted">No items yet. Add one in Report Item.</div>`;
}
render(items);

document.getElementById("searchBtn").addEventListener("click", () => {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const filtered = items.filter(it =>
    it.name.toLowerCase().includes(q) || it.location.toLowerCase().includes(q)
  );
  render(filtered);
});