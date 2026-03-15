import { requireAuth, getItems } from "./data.js";
import { attachLogout } from "./auth.js";

requireAuth();
attachLogout("logoutBtn");

const grid = document.getElementById("grid");
const qEl = document.getElementById("q");
const sortEl = document.getElementById("sort");
const typeEl = document.getElementById("typeFilter");
const searchBtn = document.getElementById("searchBtn");
const showingText = document.getElementById("showingText");

let activeCat = "All";

function getBadge(type) {
  return type === "found"
    ? `<span class="badge badge-found">Found</span>`
    : `<span class="badge badge-lost">Lost</span>`;
}

function getSafeImage(item) {
  return item.photo && item.photo.trim() !== ""
    ? item.photo
    : "https://picsum.photos/600/400?random=11";
}

function createCard(item) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 browse-item-card p-3">
        <img src="${getSafeImage(item)}" class="img-cover mb-3" alt="${item.name}">
        
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="fw-bold mb-0 text-truncate me-2">${item.name}</h5>
          ${getBadge(item.type)}
        </div>

        <p class="small-muted mb-2">${item.description || "No description available."}</p>

        <div class="small-muted mb-1">📍 ${item.location}</div>
        <div class="small-muted mb-3">📅 ${item.date}</div>

        <a href="details.html?id=${encodeURIComponent(item.id)}" class="btn btn-outline-primary w-100 mt-auto">
          View Details →
        </a>
      </div>
    </div>
  `;
}

function applyFilters() {
  let items = getItems();

  const q = qEl.value.trim().toLowerCase();
  const sort = sortEl.value;
  const type = typeEl.value;

  if (q) {
    items = items.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }

  if (type !== "all") {
    items = items.filter(item => item.type === type);
  }

  if (activeCat !== "All") {
    items = items.filter(item => item.category === activeCat);
  }

  items.sort((a, b) => {
    const d1 = new Date(a.createdAt || a.date);
    const d2 = new Date(b.createdAt || b.date);
    return sort === "new" ? d2 - d1 : d1 - d2;
  });

  showingText.textContent = `Showing ${items.length} item${items.length !== 1 ? "s" : ""}`;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="card p-4 text-center">
          <h5 class="fw-bold mb-2">No items found</h5>
          <p class="small-muted mb-0">Try changing your search, category, or filter.</p>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(createCard).join("");
}

searchBtn.addEventListener("click", applyFilters);
qEl.addEventListener("input", applyFilters);
sortEl.addEventListener("change", applyFilters);
typeEl.addEventListener("change", applyFilters);

document.querySelectorAll(".catBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".catBtn").forEach(b => b.classList.remove("active-cat"));
    btn.classList.add("active-cat");
    activeCat = btn.dataset.cat;
    applyFilters();
  });
});

applyFilters();