import { feedURL } from "./components/variables";
console.log(feedURL);

async function feed() {
  const feedOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  console.log(feedOption);
}

feed();
