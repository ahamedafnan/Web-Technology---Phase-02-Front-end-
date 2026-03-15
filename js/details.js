import { requireAuth, getItems } from "./data.js";
import { attachLogout } from "./auth.js";

requireAuth();
attachLogout("logoutBtn");

const box = document.getElementById("box");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const items = getItems();
const item = items.find(i => i.id === id);

if (!item) {
  box.innerHTML = "<p>Item not found</p>";
} else {
  box.innerHTML = `
    <div class="row align-items-start g-4 details-wrapper">

      <div class="col-md-5">
        <div class="details-image-box">
          <img 
            src="${item.photo || 'https://via.placeholder.com/500'}" 
            alt="${item.name}"
            class="details-image"
          >
        </div>
      </div>

      <div class="col-md-7">
        <h2 class="mb-3">${item.name}</h2>

        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Date:</strong> ${item.date}</p>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Email:</strong> ${item.contactEmail}</p>
        <p><strong>Phone:</strong> ${item.contactPhone}</p>

        <a href="browse.html" class="btn btn-secondary mt-3">Back</a>
      </div>

    </div>
  `;
}