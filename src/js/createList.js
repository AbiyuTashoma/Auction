import {
  listingsURL,
  createlistForm,
  ListNoteContainer,
  titleContainer,
  titleNoteContainer,
  descriptionContainer,
  descriptionNoteContainer,
  mediaContainer,
  mediaNoteContainer,
  enddateContainer,
  enddateNoteContainer,
} from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import { validateLength, validateUrl } from "./components/validate.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";
import { accessToken } from "./components/profileData.js";

async function createList(event) {
  event.preventDefault();

  let validList = true;

  const title = titleContainer.value;
  const description = descriptionContainer.value;
  const media = mediaContainer.value;
  const enddate = enddateContainer.value;

  const validTitle = validateLength(title, 1, 50);
  const validDescription = validateLength(description, 5);
  const validMedia = validateUrl(media);
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

  if (!validMedia) {
    validList = false;
    setFeedback(
      mediaNoteContainer,
      mediaContainer,
      "Add proper url.",
      "text-danger",
    );
  }

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
      media: [`${media}`],
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
    setFeedback(
      ListNoteContainer,
      ListNoteContainer,
      `${listResponse["json"]["status"]}`,
      "text-danger",
    );
    console.log(listResponse);
  }
}

createlistForm.addEventListener("submit", createList);

titleContainer.oninput = function () {
  clearFeedback(titleNoteContainer, titleContainer);
  clearFeedback(ListNoteContainer, ListNoteContainer);
};

descriptionContainer.oninput = function () {
  clearFeedback(descriptionNoteContainer, descriptionContainer);
  clearFeedback(ListNoteContainer, ListNoteContainer);
};

mediaContainer.oninput = function () {
  clearFeedback(mediaNoteContainer, mediaContainer);
  clearFeedback(ListNoteContainer, ListNoteContainer);
};

enddateContainer.oninput = function () {
  clearFeedback(enddateNoteContainer, enddateContainer);
  clearFeedback(ListNoteContainer, ListNoteContainer);
};
