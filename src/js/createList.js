import {
  //   listinsURL,
  createlistForm,
  //   ListNoteContainer,
  titleContainer,
  //   titleNoteContainer,
  descriptionContainer,
  //   descriptionNoteContainer,
  mediaContainer,
  //   mediaNoteContainer,
  enddateContainer,
  //   enddateNoteContainer,
} from "./components/variables.js";
// import { apiRequest } from "./components/apirequest.js";
import { validateLength } from "./components/validate.js";
// import { setFeedback, clearFeedback } from "./components/displayMessage.js";

function createList(event) {
  event.preventDefault();

  let validList = true;

  const title = titleContainer.value;
  const description = descriptionContainer.value;
  const media = mediaContainer.value;
  const enddate = enddateContainer.value;

  const validTitle = validateLength(title, 1);

  console.log(title, validTitle, validList);
  console.log(description);
  console.log(media);
  console.log(enddate);
}

createlistForm.addEventListener("submit", createList);
