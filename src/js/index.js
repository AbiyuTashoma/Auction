import {
  feedContainer,
  feedURL,
  searchFormContainer,
  searchContainer,
  resultContainer,
  sortByContainer,
  loading,
  viewMoreButton,
  offset,
} from "./components/variables.js";
import { apiRequest } from "./components/apiRequest.js";
import { createFeedHtml } from "./components/feedHtml.js";
import { searchText } from "./components/search.js";
import { setFeedback } from "./components/displayMessage.js";
import { setOffset, resetOffset } from "./components/offset.js";

/**
 * Loads and displays lists
 * @param {string} srt sort string
 */
async function loadFeed(srt = "created") {
  feedContainer.innerHTML = loading;
  const feedResponse = await apiRequest(feedURL + `&sort=${srt}`);
  if (feedResponse["json"][0]["id"]) {
    feedContainer.innerHTML = await createFeedHtml(
      feedResponse["json"],
      "src/html/",
    );
    resetOffset(offset);
    console.log(offset["offset"]);
  } else {
    setFeedback(
      feedContainer,
      feedContainer,
      "Unknown error, try again",
      "text-danger text-center",
    );
  }
}

/**
 * searches and displays lists containing the search value
 * @param {event} event
 * @returns
 */
async function search(event) {
  event.preventDefault();
  const searchValue = searchContainer.value.toLowerCase();

  if (!searchValue.length) {
    return;
  }

  feedContainer.innerHTML = loading;
  const fResponse = await apiRequest(feedURL + `&sort=created`);
  if (fResponse["json"][0]["id"]) {
    const searchResult = await searchText(fResponse["json"], searchValue);
    resultContainer.innerHTML = `<p>${searchResult.length} results found</p>`;
    feedContainer.innerHTML = await createFeedHtml(searchResult, "src/html/");
    resetOffset(offset);
    console.log(offset["offset"]);
  } else {
    setFeedback(
      feedContainer,
      feedContainer,
      "Unknown error, try again",
      "text-danger text-center",
    );
  }
}

/**
 * sorts lists based selection
 */
sortByContainer.onchange = function () {
  const sortValue = sortByContainer.value;
  resultContainer.innerHTML = "";
  loadFeed(sortValue);
};

/**
 * fetches next 100 lists and displays
 */
async function viewMore() {
  const srtValue = sortByContainer.value;
  const searchValue = searchContainer.value.toLowerCase();

  const viewResponse = await apiRequest(
    feedURL + `&sort=${srtValue}&offset=${offset["offset"]}`,
  );

  console.log(viewResponse);
  if (viewResponse["json"][0]["id"]) {
    const viewSearchsResult = await searchText(
      viewResponse["json"],
      searchValue,
    );

    feedContainer.innerHTML += await createFeedHtml(
      viewSearchsResult,
      "src/html/",
    );
    setOffset(offset, 100);
    if (viewSearchsResult.length < 100) {
      viewMoreButton.disabled = "true";
    }
    console.log(offset["offset"]);
  } else {
    setFeedback(
      feedContainer,
      feedContainer,
      "Unknown error, try again",
      "text-danger text-center",
    );
  }
}

loadFeed();
searchFormContainer.addEventListener("submit", search);
viewMoreButton.addEventListener("click", viewMore);
