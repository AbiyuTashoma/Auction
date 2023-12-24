import { apiRequest } from "./components/apirequest.js";
import { registerURL } from "./components/variables.js";
import {
  validateName,
  validateEmail,
  validateUrl,
  validateLength,
} from "./components/validate.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";

const registerNameContainer = document.querySelector("#register-name");
const registerEmailContainer = document.querySelector("#register-email");
const registerPasswordContainer = document.querySelector("#register-password");
const registerAvatarContainer = document.querySelector("#register-avatar");

const noteNameContainer = document.querySelector(".note-name");
const noteEmailContainer = document.querySelector(".note-email");
const notePasswordContainer = document.querySelector(".note-password");
const noteAvatarContainer = document.querySelector(".note-avatar");
const successContainer = document.querySelector(".feedback-success");

const registerFormContainer = document.querySelector(".register-form");

//Clear error oninput
registerNameContainer.oninput = function () {
  clearFeedback(noteNameContainer, registerNameContainer);
  clearFeedback(successContainer, successContainer);
};
registerEmailContainer.oninput = function () {
  clearFeedback(noteEmailContainer, registerEmailContainer);
  clearFeedback(successContainer, successContainer);
};
registerPasswordContainer.oninput = function () {
  clearFeedback(notePasswordContainer, registerPasswordContainer);
  clearFeedback(successContainer, successContainer);
};
registerAvatarContainer.oninput = function () {
  clearFeedback(noteAvatarContainer, registerAvatarContainer);
  clearFeedback(successContainer, successContainer);
};

//validate input
/**
 * validates and registers user
 * @param {event} event
 */
async function validate(event) {
  event.preventDefault();

  let validRegister = true;

  const userName = registerNameContainer.value;
  const email = registerEmailContainer.value;
  const password = registerPasswordContainer.value;
  const url = registerAvatarContainer.value;

  const validName = validateName(userName, 5);
  const validEmail = validateEmail(email);
  const validPassword = validateLength(password, 8);

  if (!validName) {
    validRegister = false;
    setFeedback(
      noteNameContainer,
      registerNameContainer,
      "Username should be between 5 and 20 characters. Allowed characters are: a-z, A-Z, 0-9, _ (underscore)",
      "text-danger",
    );
  }

  if (!validEmail) {
    validRegister = false;
    setFeedback(
      noteEmailContainer,
      registerEmailContainer,
      "Enter valid email",
      "text-danger",
    );
  }

  if (url) {
    const validUrl = validateUrl(url);
    if (!validUrl) {
      validRegister = false;
      setFeedback(
        noteAvatarContainer,
        registerAvatarContainer,
        "Enter valid url",
        "text-danger",
      );
    }
  }

  if (!validPassword) {
    validRegister = false;
    setFeedback(
      notePasswordContainer,
      registerPasswordContainer,
      "Password should be atleast 8 characters",
      "text-danger",
    );
  }

  if (validRegister) {
    const registerData = {
      name: `${userName}`,
      email: `${email}`,
      password: `${password}`, //"theusualcode"
      avatar: `${url}`,
    };

    const registerOption = {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const registerResponse = await apiRequest(registerURL, registerOption);
    console.log(registerResponse);

    if (registerResponse["output"] == "json") {
      if (registerResponse["json"]["id"]) {
        setFeedback(
          successContainer,
          successContainer,
          "Registration successful, You are now able to login!",
          "text-success",
        );
        registerFormContainer.reset();
      } else if (registerResponse["json"]["errors"][0]) {
        console.log(registerResponse["json"]["errors"][0]["message"]);
        setFeedback(
          successContainer,
          successContainer,
          registerResponse["json"]["errors"][0]["message"],
          "text-danger",
        );
      }
    }

    if (registerResponse["output"] == "error") {
      setFeedback(
        successContainer,
        successContainer,
        "Unknown error, please try again",
        "text-danger",
      );
    }
  }
}

registerFormContainer.addEventListener("submit", validate);
