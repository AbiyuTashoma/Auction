import { currentUser, accessToken } from "./components/profileData.js";
import { profileInfoContainer, BASE_URL } from "./components/variables.js";
import { viewProfile } from "./components/renderProfile.js";

import { apiRequest } from "./components/apirequest.js";
import { validateUrl } from "./components/validate.js";

viewProfile(currentUser, profileInfoContainer);

const updateAvatarContainer = document.querySelector("#update-form");

async function submitUpdate(event) {
  event.preventDefault();

  const url = document.querySelector("#edit-avatar").value;
  const updateURL = BASE_URL + `/profiles/${currentUser["name"]}/media`;
  const validUrl = validateUrl(url);

  console.log(updateURL);
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
    console.log(updateResponse["json"]);
  } else {
    console.log("ERROR");
  }
}

updateAvatarContainer.addEventListener("submit", submitUpdate);
