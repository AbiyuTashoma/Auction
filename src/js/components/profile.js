export const currentUser = JSON.parse(localStorage.getItem("user"));
export const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
