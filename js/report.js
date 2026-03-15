import { requireAuth, getItems, saveItems, uid } from "./data.js";
import { attachLogout } from "./auth.js";

requireAuth();
attachLogout("logoutBtn");

const form = document.getElementById("reportForm");
const photoInput = document.getElementById("photo");

function fileToBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) return;

  const type = form.type.value;
  const name = form.name.value.trim();
  const category = form.category.value;
  const location = form.location.value.trim();
  const date = form.date.value;
  const description = form.description.value.trim();
  const contactEmail = form.contactEmail.value.trim();
  const contactPhone = form.contactPhone.value.trim();

  let photo = "";
  const file = photoInput.files?.[0];
  if (file) photo = await fileToBase64(file);

  const items = getItems();
  items.push({
    id: uid(),
    type, name, category, location, date, description, contactEmail, contactPhone,
    photo,
    createdAt: new Date().toISOString()
  });
  saveItems(items);

  alert("Item submitted successfully!");
  window.location.href = "browse.html";
});