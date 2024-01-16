import {
  listingsURL,
  createlistForm,
  listNoteContainer,
  titleContainer,
  titleNoteContainer,
  descriptionContainer,
  descriptionNoteContainer,
  mediaContainer,
  mediaNoteContainer,
  enddateContainer,
  enddateNoteContainer,
} from "./components/variables.js";
import { apiRequest } from "./components/apiRequest.js";
import { validateLength, validateUrl } from "./components/validate.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";
import { accessToken, isLoggedIn } from "./components/profileData.js";
import { refresh } from "./components/reload.js";
import { toArray } from "./components/stringToArray.js";

async function createList(event) {
  event.preventDefault();

  if (!isLoggedIn) {
    window.open("src/html/login.html", "_self");
    return 0;
  }

  let validList = true;

  const title = titleContainer.value;
  const description = descriptionContainer.value;
  const media = mediaContainer.value;
  const mediaArray = toArray(media, ",");
  const enddate = enddateContainer.value;

  const validTitle = validateLength(title, 1, 50);
  const validDescription = validateLength(description, 5);
  const validDate = validateLength(enddate, 16, 16);

  if (!validTitle) {
    validList = false;
    setFeedback(
      titleNoteContainer,
      titleContainer,
      "Title should be between 1 to 50 characters.",
      "text-danger",
    );
  }

  if (!validDescription) {
    validList = false;
    setFeedback(
      descriptionNoteContainer,
      descriptionContainer,
      "Description should be minimum of 5 characters.",
      "text-danger",
    );
  }

  mediaArray.forEach((element) => {
    if (!validateUrl(element)) {
      validList = false;
      setFeedback(
        mediaNoteContainer,
        mediaContainer,
        "Add proper url. Urls are separated by comma",
        "text-danger",
      );
      return;
    }
  });

  if (!validDate) {
    validList = false;
    setFeedback(
      enddateNoteContainer,
      enddateContainer,
      "Add proper date and time.",
      "text-danger",
    );
  }

  if (validList) {
    const listData = {
      title: `${title}`,
      description: `${description}`,
      media: mediaArray,
      endsAt: `${enddate}`,
    };

    const listOption = {
      method: "POST",
      body: JSON.stringify(listData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const listResponse = await apiRequest(listingsURL, listOption);

    if (listResponse["json"]["id"]) {
      setFeedback(
        listNoteContainer,
        listNoteContainer,
        "List successfully created",
        "text-success",
      );
      createlistForm.reset();
      setTimeout(refresh, 2000);
    } else {
      setFeedback(
        listNoteContainer,
        listNoteContainer,
        `Contact us and provide error code: ${listResponse["json"]["statusCode"]}`,
        "text-danger",
      );
    }
  }
}

createlistForm.addEventListener("submit", createList);

titleContainer.oninput = function () {
  clearFeedback(titleNoteContainer, titleContainer);
  clearFeedback(listNoteContainer, listNoteContainer);
};

descriptionContainer.oninput = function () {
  clearFeedback(descriptionNoteContainer, descriptionContainer);
  clearFeedback(listNoteContainer, listNoteContainer);
};

mediaContainer.oninput = function () {
  clearFeedback(mediaNoteContainer, mediaContainer);
  clearFeedback(listNoteContainer, listNoteContainer);
};

enddateContainer.oninput = function () {
  clearFeedback(enddateNoteContainer, enddateContainer);
  clearFeedback(listNoteContainer, listNoteContainer);
};
