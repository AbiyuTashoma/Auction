import {
  feedContainer,
  feedURL,
  searchFormContainer,
  searchContainer,
  resultContainer,
} from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import { createFeedHtml } from "./components/feedHtml.js";
import { searchText } from "./components/search.js";

async function loadFeed() {
  const feedResponse = await apiRequest(feedURL);
  console.log(feedResponse["json"]);
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

loadFeed();

searchFormContainer.addEventListener("submit", search);
