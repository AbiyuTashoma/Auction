export function renderUser(status, userPfl, usrName, cdtContainer) {
  if (status) {
    usrName.innerHTML = `${userPfl["name"]}  <img src="${userPfl["avatar"]}" class="avatar-small" alt="avatar"/>`;
    cdtContainer.innerHTML = userPfl["credits"];
  } else {
    usrName.innerHTML = "Menu";
    cdtContainer.innerHTML = 0;
  }
}
