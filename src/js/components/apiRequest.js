/**
 * Makes api request and returns result
 * @param {URL} apiURL
 * @param {Request} requestOption
 */
export async function apiRequest(apiURL, requestOption) {
  const response = await fetch(apiURL, requestOption);

  try {
    const json = await response.json();
    return { output: "json", json: json };
  } catch (error) {
    throw new Error(response.statusText);
  }
}
