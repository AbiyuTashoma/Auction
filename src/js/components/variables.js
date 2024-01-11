export const BASE_URL = "https://api.noroff.dev/api/v1/auction";
export const registerURL = BASE_URL + "/auth/register";
export const loginURL = BASE_URL + "/auth/login";
export const listingsURL = BASE_URL + "/listings";
export const feedURL = listingsURL + "?_active=true";
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
export const searchFormContainer = document.querySelector(".search-form");
export const searchContainer = document.querySelector("#search");
export const resultContainer = document.querySelector(".result");
export const sortByContainer = document.querySelector("#sortBy");

export const listNoteContainer = document.querySelector(".note-createlist");
export const createlistForm = document.querySelector("#createlist");
export const titleContainer = document.querySelector("#list-title");
export const titleNoteContainer = document.querySelector(".note-title");
export const descriptionContainer = document.querySelector("#list-description");
export const descriptionNoteContainer =
  document.querySelector(".note-description");
export const mediaContainer = document.querySelector("#list-media");
export const mediaNoteContainer = document.querySelector(".note-media");
export const enddateContainer = document.querySelector("#list-enddate");
export const enddateNoteContainer = document.querySelector(".note-enddate");

export const innerCarousel = document.querySelector(".carousel-inner");
export const title = document.querySelector(".title");
export const description = document.querySelector(".description");
export const bidEnddate = document.querySelector(".bid-enddate");
export const currentBid = document.querySelector(".current-bid");
export const newBid = document.querySelector(".new-bid");
export const bidForm = document.querySelector(".bid-form");
export const bidNote = document.querySelector(".note-bid");

export const contactForm = document.querySelector(".contact-form");
export const contactSuccess = document.querySelector(".contact-success");
export const contactName = document.querySelector("#contact-name");
export const noteContactName = document.querySelector(".note-contactname");
export const contactEmail = document.querySelector("#contact-email");
export const noteContactEmail = document.querySelector(".note-contactemail");
export const contactMessage = document.querySelector("#contact-message");
export const noteContactMessage = document.querySelector(
  ".note-contactmessage",
);

export const loading = `<div class="text-center">
                <div class="spinner-border mt-3 text-primary" style="width: 4rem; height: 4rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>`;
