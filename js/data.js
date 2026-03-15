export function uid() {
  return "id_" + Date.now() + "_" + Math.random().toString(16).slice(2);
}

export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getItems() {
  return JSON.parse(localStorage.getItem("items") || "[]");
}

export function saveItems(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

export function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

export function setCurrentUser(email) {
  localStorage.setItem("currentUser", email);
}

export function logout() {
  localStorage.removeItem("currentUser");
}

export function requireAuth() {
  const u = getCurrentUser();
  if (!u) window.location.href = "index.html";
}

export function getCurrentUserData() {
  const currentEmail = getCurrentUser();
  const users = getUsers();
  return users.find(user => user.email === currentEmail) || null;
}