export const BASE_URL = "https://api.noroff.dev/api/v1/auction";
export const registerURL = BASE_URL + "/auth/register";
export const loginURL = BASE_URL + "/auth/login";
export const listingsURL = BASE_URL + "/listings";
export const feedURL = listingsURL + "?_active=true";
export const defaultAvatar =
  "https://robohash.org/5f735a19afe448937c8ff46ab8c6c3ea?set=set4&bgset=&size=400x400";

//Login variables
export const loginEmailContainer = document.querySelector("#login-email");
export const loginPasswordContainer = document.querySelector("#login-password");
export const feedbackErrorContainer = document.querySelector(".feedback-error");
export const loginFormContainer = document.querySelector(".login-form");

export const loggedOutContainer = document.querySelectorAll(".logged-out");
export const loggedInContainer = document.querySelectorAll(".logged-in");
export const logoutBtn = document.querySelector(".logout-btn");
export const userMenuContainer = document.querySelector(".user-menu");
export const creditContainer = document.querySelector(".credits");

//Register variables
export const registerNameContainer = document.querySelector("#register-name");
export const registerEmailContainer = document.querySelector("#register-email");
export const registerPasswordContainer =
  document.querySelector("#register-password");
export const registerConfirmPassword = document.querySelector(
  "#register-confirm-password",
);
export const registerAvatarContainer =
  document.querySelector("#register-avatar");
export const noteNameContainer = document.querySelector(".note-name");
export const noteEmailContainer = document.querySelector(".note-email");
export const notePasswordContainer = document.querySelector(".note-password");
export const noteAvatarContainer = document.querySelector(".note-avatar");
export const successContainer = document.querySelector(".feedback-success");
export const registerFormContainer = document.querySelector(".register-form");

//Profile variables
export const profileInfoContainer = document.querySelector(".profile-info");
export const profileFeedContainer = document.querySelector(".profile-feed");

//Feed variables
export const feedContainer = document.querySelector(".feed");
export const searchFormContainer = document.querySelector(".search-form");
export const searchContainer = document.querySelector("#search");
export const resultContainer = document.querySelector(".result");
export const sortByContainer = document.querySelector("#sortBy");
export const viewMoreButton = document.querySelector(".view-more");
export const noteViewMore = document.querySelector(".note-viewmore");
export const offset = { offset: 100 };

//Create list variables
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

//Alist variables
export const innerCarousel = document.querySelector(".carousel-inner");
export const title = document.querySelector(".title");
export const description = document.querySelector(".description");
export const bidEnddate = document.querySelector(".bid-enddate");
export const currentBid = document.querySelector(".current-bid");
export const newBid = document.querySelector(".new-bid");
export const bidForm = document.querySelector(".bid-form");
export const bidNote = document.querySelector(".note-bid");
export const aListNote = document.querySelector(".a-list-note");

//Contactus variables
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

//loading
export const loading = `<div class="text-center">
                <div class="spinner-border mt-3 text-primary" style="width: 4rem; height: 4rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>`;

//Edit post item
export const modalForms = {};
