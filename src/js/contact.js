import {
  contactForm,
  contactSuccess,
  contactName,
  noteContactName,
  contactEmail,
  noteContactEmail,
  contactMessage,
  noteContactMessage,
} from "./components/variables.js";
import {
  validateName,
  validateEmail,
  validateLength,
} from "./components/validate.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";

/**
 * Validates and submits form
 * @param {event} event
 */
function submitFeedback(event) {
  event.preventDefault();

  let validFeedback = true;

  const cName = contactName.value;
  const cEmail = contactEmail.value;
  const cMessage = contactMessage.value;

  const validName = validateName(cName, 2, 20);
  const validEmail = validateEmail(cEmail);
  const validMessage = validateLength(cMessage, 5);

  if (!validName) {
    validFeedback = false;
    setFeedback(
      noteContactName,
      contactName,
      "Username should be between 2 and 20 characters. Allowed characters are: a-z, A-Z, 0-9, _ (underscore)",
      "text-danger",
    );
  }

  if (!validEmail) {
    validFeedback = false;
    setFeedback(
      noteContactEmail,
      contactEmail,
      "Enter valid email",
      "text-danger",
    );
  }

  if (!validMessage) {
    validFeedback = false;
    setFeedback(
      noteContactMessage,
      contactMessage,
      "Message should be atleast 5 characters.",
      "text-danger",
    );
  }

  if (validFeedback) {
    setFeedback(
      contactSuccess,
      contactSuccess,
      "Message successfully sent",
      "text-success",
    );
    contactForm.reset();
  }
}

contactForm.addEventListener("submit", submitFeedback);

//clear error on input
contactName.oninput = function () {
  clearFeedback(noteContactName, contactName);
  clearFeedback(contactSuccess, contactSuccess);
};

contactEmail.oninput = function () {
  clearFeedback(noteContactEmail, contactEmail);
  clearFeedback(contactSuccess, contactSuccess);
};

contactMessage.oninput = function () {
  clearFeedback(noteContactMessage, contactMessage);
  clearFeedback(contactSuccess, contactSuccess);
};
