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
  noteViewMore,
} from "./components/variables.js";
import { apiRequest } from "./components/apiRequest.js";
import { createFeedHtml } from "./components/feedHtml.js";
import { searchText } from "./components/search.js";
import { clearFeedback, setFeedback } from "./components/displayMessage.js";
import { setOffset, resetOffset } from "./components/offset.js";
import { cleanDescription } from "./components/clean_description.js";
import { disable, enable } from "./components/enable_disable.js";

/**
 * Loads and displays lists
 * @param {string} srt sort string
 */
async function loadFeed(srt = "created") {
  clearFeedback(noteViewMore, noteViewMore);
  feedContainer.innerHTML = loading;
  const feedResponse = await apiRequest(feedURL + `&sort=${srt}`);
  if (feedResponse["json"][0]["id"]) {
    feedContainer.innerHTML = await createFeedHtml(
      feedResponse["json"],
      "src/html/",
    );
    resetOffset(offset);
    enable(viewMoreButton);
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
  const searchSortValue = sortByContainer.value;

  if (!searchValue.length) {
    return;
  }

  feedContainer.innerHTML = loading;
  const fResponse = await apiRequest(feedURL + `&sort=${searchSortValue}`);
  if (fResponse["json"][0]["id"]) {
    const cleanResult = await cleanDescription(fResponse["json"]);
    const searchResult = await searchText(cleanResult, searchValue);
    resultContainer.innerHTML = `<p>${searchResult.length} results found</p>`;
    feedContainer.innerHTML = await createFeedHtml(searchResult, "src/html/");
    resetOffset(offset);
    clearFeedback(noteViewMore, noteViewMore);
    enable(viewMoreButton);
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
sortByContainer.onchange = async function () {
  const sortValue = sortByContainer.value;
  const ssValue = searchContainer.value.toLowerCase();
  resultContainer.innerHTML = "";

  const sortResponse = await apiRequest(feedURL + `&sort=${sortValue}`);

  if (sortResponse["json"][0]["id"]) {
    const cleanSortResult = await cleanDescription(sortResponse["json"]);
    const sortSearchsResult = await searchText(cleanSortResult, ssValue);

    feedContainer.innerHTML = await createFeedHtml(
      sortSearchsResult,
      "src/html/",
    );
    resetOffset(offset);
    enable(viewMoreButton);
  } else {
    setFeedback(
      feedContainer,
      feedContainer,
      "Unknown error, try again",
      "text-danger text-center",
    );
  }
};

/**
 * fetches next 100 lists and displays
 */
async function viewMore() {
  const srtValue = sortByContainer.value;
  const searchValue = searchContainer.value.toLowerCase();
  resultContainer.innerHTML = "";

  const viewResponse = await apiRequest(
    feedURL + `&sort=${srtValue}&offset=${offset["offset"]}`,
  );

  if (viewResponse["json"][0]["id"]) {
    const cleanViewResult = await cleanDescription(viewResponse["json"]);
    const viewSearchsResult = await searchText(cleanViewResult, searchValue);
    feedContainer.innerHTML += await createFeedHtml(
      viewSearchsResult,
      "src/html/",
    );
    setOffset(offset, 100);
    if (viewResponse["json"].length < 100) {
      disable(viewMoreButton);
    }
  } else {
    setFeedback(
      noteViewMore,
      noteViewMore,
      "Unknown error, try again",
      "text-danger text-center",
    );
  }
}

loadFeed();
searchFormContainer.addEventListener("submit", search);
viewMoreButton.addEventListener("click", viewMore);
