import {
  feedContainer,
  feedURL,
  searchFormContainer,
  searchContainer,
  resultContainer,
  sortByContainer,
} from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import { createFeedHtml } from "./components/feedHtml.js";
import { searchText } from "./components/search.js";

async function loadFeed(srt = "created") {
  const feedResponse = await apiRequest(feedURL + `&sort=${srt}`);
  feedContainer.innerHTML = await createFeedHtml(feedResponse["json"]);
}

async function search(event) {
  event.preventDefault();
  const searchValue = searchContainer.value.toLowerCase();

  if (searchValue.length) {
    const fResponse = await apiRequest(feedURL);
    const searchResult = searchText(fResponse["json"], searchValue);
    resultContainer.innerHTML = `<p>${searchResult.length} results found</p>`;
    feedContainer.innerHTML = await createFeedHtml(searchResult);
  }
}

sortByContainer.onchange = function () {
  const sortValue = sortByContainer.value;
  resultContainer.innerHTML = "";
  loadFeed(sortValue);
};

loadFeed();

searchFormContainer.addEventListener("submit", search);
