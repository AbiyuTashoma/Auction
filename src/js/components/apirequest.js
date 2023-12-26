/**
 * Makes api request and returns result
 * @param {URL} apiURL
 * @param {Request} requestOption
 */
export async function apiRequest(apiURL, requestOption) {
  try {
    const response = await fetch(apiURL, requestOption);
    const json = await response.json();

    // console.log(json);
    return { output: "json", json: json };
  } catch (error) {
    // console.log(error);
    return { output: "error", error: error };
  }
}
