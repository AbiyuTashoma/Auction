import {
  feedContainer,
  feedURL,
  searchFormContainer,
  searchContainer,
  resultContainer,
  sortByContainer,
  loading,
} from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import { createFeedHtml } from "./components/feedHtml.js";
import { searchText } from "./components/search.js";
import { setFeedback } from "./components/displayMessage.js";

async function loadFeed(srt = "created") {
  feedContainer.innerHTML = loading;
  const feedResponse = await apiRequest(feedURL + `&sort=${srt}`);

  if (feedResponse["error"] || feedResponse["json"]["errors"]) {
    setFeedback(
      feedContainer,
      feedContainer,
      "Unknown error, try again",
      "text-danger text-center",
    );
  } else {
    feedContainer.innerHTML = await createFeedHtml(
      feedResponse["json"],
      "src/html/",
    );
  }
}

async function search(event) {
  event.preventDefault();
  const searchValue = searchContainer.value.toLowerCase();

  if (!searchValue.length) {
    return;
  }

  feedContainer.innerHTML = loading;
  const fResponse = await apiRequest(feedURL + `&sort=created`);
  if (fResponse["error"] || fResponse["json"]["errors"]) {
    setFeedback(
      feedContainer,
      feedContainer,
      "Unknown error, try again",
      "text-danger text-center",
    );
  } else {
    const searchResult = await searchText(fResponse["json"], searchValue);
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
