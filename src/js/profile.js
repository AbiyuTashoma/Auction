import { currentUser } from "./components/profileData.js";
import { profileInfoContainer } from "./components/variables.js";
import { viewProfile } from "./components/renderProfile.js";

viewProfile(currentUser, profileInfoContainer);
