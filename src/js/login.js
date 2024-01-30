import { apiRequest } from "./components/apiRequest.js";
import {
  loginURL,
  loginEmailContainer,
  loginPasswordContainer,
  feedbackErrorContainer,
  loginFormContainer,
} from "./components/variables.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";

//clear error message oninput
loginEmailContainer.oninput = function () {
  clearFeedback(feedbackErrorContainer, feedbackErrorContainer);
};

loginPasswordContainer.oninput = function () {
  clearFeedback(feedbackErrorContainer, feedbackErrorContainer);
};

/**
 * authenticates and logs in user
 * @param {event} event
 */
async function loginUser(event) {
  event.preventDefault();

  const email = loginEmailContainer.value;
  const password = loginPasswordContainer.value;

  const loginData = {
    email: `${email}`,
    password: `${password}`,
  };

  const loginOption = {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const loginResponse = await apiRequest(loginURL, loginOption);

  if (loginResponse["json"]["name"]) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(loginResponse["json"]["accessToken"]),
    );
    delete loginResponse["json"]["accessToken"];
    localStorage.setItem("user", JSON.stringify(loginResponse["json"]));
    loginFormContainer.reset();
    window.open("../../index.html", "_self");
  } else {
    setFeedback(
      feedbackErrorContainer,
      feedbackErrorContainer,
      "Invalid email or password",
      "text-danger",
    );
  }
}

loginFormContainer.addEventListener("submit", loginUser);
