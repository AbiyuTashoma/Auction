import { currentUser, isLoggedIn } from "./components/profileData.js";
import { renderUser } from "./components/renderUser.js";
import { renderMenu } from "./components/renderMenu.js";
import { logout } from "./components/logout.js";
import {
  userMenuContainer,
  creditContainer,
  loggedOutContainer,
  logoutBtn,
  loggedInContainer,
} from "./components/variables.js";

renderUser(isLoggedIn, currentUser, userMenuContainer, creditContainer);
renderMenu(isLoggedIn, loggedOutContainer, loggedInContainer);

logoutBtn.addEventListener("click", logout);
