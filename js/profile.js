import { requireAuth, getCurrentUserData } from "./data.js";
import { attachLogout } from "./auth.js";
import { renderNavbarUser } from "./navbar-user.js";

requireAuth();
attachLogout("logoutBtn");
renderNavbarUser("navUserName", "navAvatar");

const user = getCurrentUserData();

if (user) {
  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";

  document.getElementById("profileAvatar").textContent = firstLetter;
  document.getElementById("profileName").textContent = user.name || "-";
  document.getElementById("profileName2").textContent = user.name || "-";
  document.getElementById("profileStudentId").textContent = user.studentId || "-";
  document.getElementById("profileEmail").textContent = user.email || "-";
  document.getElementById("profilePhone").textContent = user.phone || "-";
}