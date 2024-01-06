import {
  listingsURL,
  innerCarousel,
  title,
  description,
  bidEnddate,
  currentBid,
  newBid,
  bidForm,
} from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import {
  createListCarousel,
  getElement,
  getEnddate,
  getCurrentBid,
  getNewBid,
} from "./components/aListHtml.js";
import { currentUser, accessToken } from "./components/profileData.js";

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
  newBid.innerHTML = await getNewBid(listResponse["json"], currentUser);
}

async function bid(event) {
  event.preventDefault();

  const newBidContainer = document.querySelector("#bid-value");
  // const currentBid = parseInt(currentBidContainer.innerHTML);
  const newBid = newBidContainer.value;

  const bidData = {
    amount: parseInt(newBid),
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
  console.log(bidResponse);
}

getAList();

bidForm.addEventListener("submit", bid);
