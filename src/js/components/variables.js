export const BASE_URL = "https://api.noroff.dev/api/v1/auction";
export const registerURL = BASE_URL + "/auth/register";
export const loginURL = BASE_URL + "/auth/login";
export const feedURL = BASE_URL + "/listings?_active=true";
export const defaultAvatar =
  "https://robohash.org/5f735a19afe448937c8ff46ab8c6c3ea?set=set4&bgset=&size=400x400";

export const loginBtn = document.querySelector(".login-btn");
export const loggedOutContainer = document.querySelectorAll(".logged-out");
export const loggedInContainer = document.querySelectorAll(".logged-in");
export const logoutBtn = document.querySelector(".logout-btn");
export const userMenuContainer = document.querySelector(".user-menu");
export const creditContainer = document.querySelector(".credits");
export const profileInfoContainer = document.querySelector(".profile-info");
export const feedContainer = document.querySelector(".feed");
