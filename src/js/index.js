import { apiRequest } from "./components/apirequest";
import { feedURL } from "./components/variables";

const feedResponse = await apiRequest(feedURL);
console.log(feedResponse);
