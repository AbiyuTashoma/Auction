import { currentUser } from "./components/profileData.js";
import { profileInfoContainer } from "./components/variables.js";
import { viewProfile } from "./components/renderProfile.js";

import { updateAvatarContainer } from "./components/variables.js";
import { updateAvatar } from "./components/updateAvatar.js";

viewProfile(currentUser, profileInfoContainer);

updateAvatarContainer.addEventListener("submit", updateAvatar);
