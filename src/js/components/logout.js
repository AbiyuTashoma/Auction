export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}
