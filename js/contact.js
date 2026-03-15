import { attachLogout } from "./auth.js";

attachLogout("logoutBtn");

(() => {
  'use strict';

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    alert("Message sent successfully!");
    form.reset();
    form.classList.remove("was-validated");
  });
})();