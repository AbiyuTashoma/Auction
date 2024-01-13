import { currentUser, accessToken } from "./components/profileData.js";
import {
  profileInfoContainer,
  BASE_URL,
  profileFeedContainer,
  loading,
} from "./components/variables.js";
import { viewProfile } from "./components/renderProfile.js";
import { apiRequest } from "./components/apirequest.js";
import { validateUrl } from "./components/validate.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";
import { refresh } from "./components/reload.js";
import { createFeedHtml } from "./components/feedHtml.js";

viewProfile(currentUser, profileInfoContainer);

const updateAvatarContainer = document.querySelector("#update-form");
const profileListingURL =
  BASE_URL + `/profiles/${currentUser["name"]}` + `?_listings=true`;

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
  console.log(profileFeedResponse["json"]);
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
    profileFeedContainer.innerHTML = await createFeedHtml(
      profileFeedResponse["json"]["listings"],
    );
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

profileLists();
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

updateAvatarContainer.addEventListener("submit", submitUpdate);
