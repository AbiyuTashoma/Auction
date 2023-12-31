import { feedContainer, feedURL } from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import { createFeedHtml } from "./components/feedHtml.js";

async function loadFeed() {
  const feedResponse = await apiRequest(feedURL);
  console.log(feedResponse["json"]);
  feedContainer.innerHTML = await createFeedHtml(feedResponse["json"]);
}

loadFeed();
