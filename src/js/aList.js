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
} from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import {
  createListCarousel,
  getElement,
  getEnddate,
  getCurrentBid,
  getNewBid,
} from "./components/aListHtml.js";
import {
  currentUser,
  accessToken,
  isLoggedIn,
} from "./components/profileData.js";
import { setFeedback, clearFeedback } from "./components/displayMessage.js";

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
let productId = param.get("id");

const aListURL = listingsURL + "/" + productId;
const bidURL = aListURL + "/bids";

async function getAList() {
  const listResponse = await apiRequest(aListURL);
  console.log(listResponse["json"]);
  innerCarousel.innerHTML = await createListCarousel(
    listResponse["json"]["media"],
  );
  title.innerHTML = await getElement(listResponse["json"], "title");
  description.innerHTML = await getElement(listResponse["json"], "description");
  bidEnddate.innerHTML = await getEnddate(listResponse["json"]);
  currentBid.innerHTML = await getCurrentBid(listResponse["json"]);
  newBid.innerHTML = await getNewBid(
    listResponse["json"],
    currentUser["credits"],
  );
}

async function bid(event) {
  event.preventDefault();

  let validBid = true;

  if (!isLoggedIn) {
    window.open("../html/login.html", "_self");
    return 0;
  }

  const newBidContainer = document.querySelector("#bid-value");
  const newBid = parseInt(newBidContainer.value);

  newBidContainer.oninput = function () {
    clearFeedback(bidNote, newBidContainer);
  };

  const highestBid = parseInt(currentBid.innerHTML);

  if (newBid > currentUser["credits"]) {
    validBid = false;
    setFeedback(bidNote, newBidContainer, "Not enough credit", "text-danger");
  }

  if (newBid <= highestBid) {
    validBid = false;
    setFeedback(
      bidNote,
      newBidContainer,
      `Bid must be higher than ${highestBid}`,
      "text-danger",
    );
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

    console.log(bidData);
    const bidResponse = await apiRequest(bidURL, bidOption);
    setFeedback(bidNote, bidNote, bidResponse["json"]["status"], "text-danger");
    console.log(bidResponse);
  }
}

getAList();

bidForm.addEventListener("submit", bid);
