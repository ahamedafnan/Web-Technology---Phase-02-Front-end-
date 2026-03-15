import { getCurrentUserData } from "./data.js";

export function renderNavbarUser(nameId, avatarId) {
  const user = getCurrentUserData();
  if (!user) return;

  const nameEl = document.getElementById(nameId);
  const avatarEl = document.getElementById(avatarId);

  if (nameEl) {
    nameEl.textContent = user.name;
  }

  if (avatarEl) {
    const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";
    avatarEl.textContent = firstLetter;
  }
}