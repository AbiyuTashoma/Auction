import { apiRequest } from "./apirequest";
import { validateUrl } from "./validate";
import { BASE_URL } from "./variables";
import { currentUser } from "./profileData";

export async function updateAvatar(event) {
  event.preventDefault();

  const updateURL = BASE_URL + `/profiles/${currentUser["name"]}/media`;
  const url = document.querySelector("#edit-avatar");
  const validUrl = validateUrl(url);

  const updateData = {
    avatar: `${url}`,
  };

  const updateOption = {
    method: "PUT",
    body: JSON.stringify(updateData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  if (validUrl) {
    const updateResponse = apiRequest(updateURL, updateOption);
    console.log(updateResponse);
  } else {
    console.log("ERROR");
  }
}
