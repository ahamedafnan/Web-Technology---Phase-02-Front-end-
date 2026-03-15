import { getUsers, saveUsers, setCurrentUser, logout } from "./data.js";

export function handleRegister(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const studentId = form.elements["studentId"]?.value.trim() || "";
    const email = form.elements["email"].value.trim().toLowerCase();
    const phone = form.elements["phone"]?.value.trim() || "";
    const password = form.elements["password"].value;
    const confirmPassword = form.elements["confirmPassword"]?.value || password;

    if (!name || !email || !password) {
      alert("Fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = getUsers();
    const exists = users.some(user => user.email === email);

    if (exists) {
      alert("This email is already registered!");
      return;
    }

    users.push({ name, studentId, email, phone, password });
    saveUsers(users);

    alert("Registration successful! Please login.");
    window.location.href = "index.html";
  });
}

export function handleLogin(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.elements["email"].value.trim().toLowerCase();
    const password = form.elements["password"].value;

    const users = getUsers();
    const foundUser = users.find(
      user => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert("Wrong email or password!");
      return;
    }

    setCurrentUser(email);
    alert("Login successful!");
    window.location.href = "home.html";
  });
}

export function attachLogout(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  btn.addEventListener("click", () => {
    logout();
    window.location.href = "index.html";
  });
}