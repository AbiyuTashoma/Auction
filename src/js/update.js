import { currentUser, isLoggedIn } from "./components/profile.js";
import { renderUser } from "./components/renderView.js";
import {
  userMenuContainer,
  creditContainer,
  loginBtn,
  logoutBtn,
} from "./components/variables.js";

renderUser(
  isLoggedIn,
  currentUser,
  userMenuContainer,
  creditContainer,
  loginBtn,
  logoutBtn,
);
