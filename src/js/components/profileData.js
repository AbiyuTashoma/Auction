/**
 * fetches and parses user data from local storage
 */
export const currentUser = JSON.parse(localStorage.getItem("user"));

/**
 * returns boolean value whether a user is logged in or not
 */
export const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

/**
 * retrieves and parses access token from local storage
 */
export const accessToken = JSON.parse(localStorage.getItem("accessToken"));
