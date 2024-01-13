import {
  listingsURL,
  innerCarousel,
  title,
  description,
  bidEnddate,
  currentBid,
  newBid,
  bidForm,
  bidNote,
  loading,
  BASE_URL,
  aListNote,
} from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import {
  createListCarousel,
  getElement,
  getEnddate,
  getNewBid,
  getMaxBid,
} from "./components/aListHtml.js";
import {
  currentUser,
  accessToken,
  isLoggedIn,
} from "./components/profileData.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";
import { refresh } from "./components/reload.js";
import { validateNumber } from "./components/validate.js";

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
let productId = param.get("id");

const aListURL = listingsURL + "/" + productId;
const aListURLwithBids = aListURL + "?&_bids=true";
const bidURL = aListURL + "/bids";

async function getAList() {
  innerCarousel.innerHTML = loading;
  const listResponse = await apiRequest(aListURLwithBids);
  if (listResponse["error"] || listResponse["json"]["errors"]) {
    setFeedback(
      aListNote,
      aListNote,
      "Unknown error, try again",
      "text-danger text-center",
    );
  } else {
    innerCarousel.innerHTML = await createListCarousel(
      listResponse["json"]["media"],
    );
    title.innerHTML = await getElement(listResponse["json"], "title");
    description.innerHTML = await getElement(
      listResponse["json"],
      "description",
    );
    bidEnddate.innerHTML = await getEnddate(listResponse["json"]);
    currentBid.innerHTML = await getMaxBid(listResponse["json"]["bids"]);
    newBid.innerHTML = await getNewBid(listResponse["json"]);
  }
}

async function bid(event) {
  event.preventDefault();

  if (!isLoggedIn) {
    window.open("../html/login.html", "_self");
    return 0;
  }

  let validBid = true;

  const profileURL = BASE_URL + `/profiles/${currentUser["name"]}`;
  const newBidContainer = document.querySelector("#bid-value");
  const newBid = parseInt(newBidContainer.value);

  newBidContainer.oninput = function () {
    clearFeedback(bidNote, newBidContainer);
  };

  const highestBid = parseInt(currentBid.innerHTML);
  const validInput = validateNumber(newBid);

  if (!validInput) {
    validBid = false;
    setFeedback(bidNote, newBidContainer, "Enter proper bid", "text-danger");
    return;
  }

  if (newBid > currentUser["credits"]) {
    validBid = false;
    setFeedback(bidNote, newBidContainer, "Not enough credit", "text-danger");
    return;
  }

  if (newBid <= highestBid) {
    validBid = false;
    setFeedback(
      bidNote,
      newBidContainer,
      `Bid must be higher than ${highestBid}`,
      "text-danger",
    );
    return;
  }

  if (validBid) {
    const bidData = {
      amount: newBid,
    };

    const bidOption = {
      method: "POST",
      body: JSON.stringify(bidData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const bidResponse = await apiRequest(bidURL, bidOption);
    if (bidResponse["json"]["id"]) {
      setFeedback(bidNote, bidNote, "Bid successfully placed", "text-success");
      getProfile(profileURL);
      setTimeout(refresh, 2000);
    } else {
      setFeedback(
        bidNote,
        bidNote,
        `Contact us and provide error code: ${bidResponse["json"]["statusCode"]}`,
        "text-danger",
      );
    }
  } else {
    setFeedback(
      bidNote,
      bidNote,
      "Enter proper bid and try again",
      "text-danger",
    );
  }
}

async function getProfile(pflURL) {
  const getOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const profileResponse = await apiRequest(pflURL, getOption);
  localStorage.setItem("user", JSON.stringify(profileResponse["json"]));
}

getAList();

bidForm.addEventListener("submit", bid);
