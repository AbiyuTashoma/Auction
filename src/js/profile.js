import { currentUser, accessToken } from "./components/profileData.js";
import {
  profileInfoContainer,
  BASE_URL,
  profileFeedContainer,
  loading,
  listingsURL,
} from "./components/variables.js";
import { viewProfile } from "./components/renderProfile.js";
import { apiRequest } from "./components/apiRequest.js";
import { validateUrl, validateLength } from "./components/validate.js";
import { toArray } from "./components/stringToArray.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";
import { refresh } from "./components/reload.js";
import { cleanDescription } from "./components/clean_description.js";
import { createProfileHtml } from "./components/renderProfile.js";
import { modalForms } from "./components/variables.js";

viewProfile(currentUser, profileInfoContainer);

const updateAvatarContainer = document.querySelector("#update-form");
const profileListingURL =
  BASE_URL + `/profiles/${currentUser["name"]}` + `?_listings=true`;

/**
 * displays lists created by the profile
 */
async function profileLists() {
  const pfListOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  profileFeedContainer.innerHTML = loading;
  const profileFeedResponse = await apiRequest(profileListingURL, pfListOption);
  if (!profileFeedResponse["json"]["listings"].length) {
    setFeedback(
      profileFeedContainer,
      profileFeedContainer,
      "No lists created yet",
      "text-dark",
    );
    return;
  }

  if (profileFeedResponse["json"]["name"]) {
    const cleanResponse = await cleanDescription(
      profileFeedResponse["json"]["listings"],
    );
    profileFeedContainer.innerHTML = createProfileHtml(cleanResponse);
    modalForms["update"] = document.querySelectorAll("#update-item-form");
    modalForms["update"].forEach((element) => {
      element.addEventListener("submit", updatePostItem);
    });
  } else {
    setFeedback(
      profileFeedContainer,
      profileFeedContainer,
      "Unknown error, try again",
      "text-danger",
    );
    return;
  }
}

/**
 * validates and updates list item
 * @param {event} event
 */
async function updatePostItem(event) {
  event.preventDefault();
  const itemId = document.querySelector(".show #update-item-form").name;
  const updateItemUrl = listingsURL + `/${itemId}`;

  let validUpdate = true;

  const titleCtr = document.querySelector(".show #update-title");
  const descriptionCtr = document.querySelector(".show #update-description");
  const mediaCtr = document.querySelector(".show #update-media");

  const title = titleCtr.value;
  const description = descriptionCtr.value;
  const media = mediaCtr.value;
  const mediaArray = toArray(media, ",");

  const updateFormNote = document.querySelector(".show .note-updatelist");
  const updateTitleNote = document.querySelector(".show .note-update-title");
  const updateDescriptionNote = document.querySelector(
    ".show .note-update-description",
  );
  const updateMediaNote = document.querySelector(".show .note-update-media");

  const validTitle = validateLength(title, 1, 50);
  const validDescription = validateLength(description, 5);

  if (!validTitle) {
    validUpdate = false;
    setFeedback(
      updateTitleNote,
      titleCtr,
      "Title should be between 1 to 50 characters.",
      "text-danger",
    );
  }

  if (!validDescription) {
    validUpdate = false;
    setFeedback(
      updateDescriptionNote,
      descriptionCtr,
      "Description should be minimum of 5 characters.",
      "text-danger",
    );
  }

  mediaArray.forEach((element) => {
    if (!validateUrl(element)) {
      validUpdate = false;
      setFeedback(
        updateMediaNote,
        mediaCtr,
        "Add proper url. Urls are separated by comma",
        "text-danger",
      );
      return;
    }
  });

  if (validUpdate) {
    const updateData = {
      title: `${title}`,
      description: `${description}`,
      media: mediaArray,
    };

    const updateOption = {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const updateResponse = await apiRequest(updateItemUrl, updateOption);

    console.log(updateResponse);

    if (updateResponse["json"]["id"]) {
      setFeedback(
        updateFormNote,
        updateFormNote,
        "Item successfully updated",
        "text-success",
      );
      setTimeout(refresh, 2000);
    } else {
      setFeedback(
        updateFormNote,
        updateFormNote,
        `Contact us and provide error code: ${updateResponse["json"]["statusCode"]}`,
        "text-danger",
      );
    }
  }

  titleCtr.oninput = function () {
    clearFeedback(updateTitleNote, titleCtr);
    clearFeedback(updateFormNote, updateFormNote);
  };

  descriptionCtr.oninput = function () {
    clearFeedback(updateDescriptionNote, descriptionCtr);
    clearFeedback(updateFormNote, updateFormNote);
  };
  mediaCtr.oninput = function () {
    clearFeedback(updateMediaNote, mediaCtr);
    clearFeedback(updateFormNote, updateFormNote);
  };
}

/**
 * validates and updates profile avatar
 * @param {event} event
 */
async function submitUpdate(event) {
  event.preventDefault();

  const newAvatarContainer = document.querySelector("#edit-avatar");
  const url = newAvatarContainer.value;
  const updateURL = BASE_URL + `/profiles/${currentUser["name"]}/media`;
  const validUrl = validateUrl(url);
  const noteUpdateAvatar = document.querySelector(".note-update");

  newAvatarContainer.oninput = function () {
    clearFeedback(noteUpdateAvatar, noteUpdateAvatar);
  };

  const updateData = {
    avatar: `${url}`,
  };

  const updateOption = {
    method: "PUT",
    body: JSON.stringify(updateData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (validUrl) {
    const updateResponse = await apiRequest(updateURL, updateOption);
    if (updateResponse["json"]["name"]) {
      localStorage.setItem("user", JSON.stringify(updateResponse["json"]));
      setFeedback(
        noteUpdateAvatar,
        noteUpdateAvatar,
        "Update successful",
        "text-success",
      );
      setTimeout(refresh, 2000);
    } else {
      setFeedback(
        noteUpdateAvatar,
        noteUpdateAvatar,
        `Contact us and provide error code: ${updateResponse["json"]["statusCode"]}`,
        "text-danger",
      );
    }
  } else {
    setFeedback(
      noteUpdateAvatar,
      noteUpdateAvatar,
      "Enter proper url and try again",
      "text-danger",
    );
  }
}

profileLists();

updateAvatarContainer.addEventListener("submit", submitUpdate);
