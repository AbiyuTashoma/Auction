import { apiRequest } from "./components/apirequest.js";
import { loginURL } from "./components/variables.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";
import { currentUser } from "./components/profile.js";

console.log(currentUser);

const loginEmailContainer = document.querySelector("#login-email");
const loginPasswordContainer = document.querySelector("#login-password");
const feedbackErrorContainer = document.querySelector(".feedback-error");
const loginFormContainer = document.querySelector(".login-form");

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
  console.log(loginResponse["json"]);

  if (loginResponse["json"]["name"]) {
    console.log("Login successful");
    localStorage.setItem(
      "accessToken",
      JSON.stringify(loginResponse["json"]["accessToken"]),
    );
    delete loginResponse["json"]["accessToken"];
    localStorage.setItem("user", JSON.stringify(loginResponse["json"]));
    window.open("../../index.html", "_self");
  } else {
    console.log("Invalid email or password");
    setFeedback(
      feedbackErrorContainer,
      feedbackErrorContainer,
      "Invalid email or password",
      "text-danger",
    );
  }
}

loginFormContainer.addEventListener("submit", loginUser);
