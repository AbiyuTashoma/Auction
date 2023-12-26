export function renderUser(
  status,
  userPfl,
  usrName,
  cdtContainer,
  lgnBtn,
  lgtBtn,
) {
  if (status) {
    usrName.innerHTML = userPfl["name"];
    cdtContainer.innerHTML = userPfl["credits"];
    lgnBtn.style.display = "none";
    lgtBtn.style.display = "block";
  } else {
    usrName.innerHTML = "Menu";
    cdtContainer.innerHTML = 0;
    lgnBtn.style.display = "block";
    lgtBtn.style.display = "none";
  }
}