import { aListContainer, listinsURL } from "./components/variables.js";
import { apiRequest } from "./components/apirequest.js";
import { createAListHtml } from "./components/aListHtml.js";

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
let productId = param.get("id");

const aListURL = listinsURL + "/" + productId;
async function getAList() {
  const listResponse = await apiRequest(aListURL);
  aListContainer.innerHTML = await createAListHtml(listResponse["json"]);
}

getAList();
