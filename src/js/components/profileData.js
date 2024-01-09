export const currentUser = JSON.parse(localStorage.getItem("user"));
export const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
export const accessToken = JSON.parse(localStorage.getItem("accessToken"));
