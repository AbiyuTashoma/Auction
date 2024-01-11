/**
 * Displays message and highlights error field
 * @param {HTMLElement} noteContainer
 * @param {HTMLElement} inputContainer
 * @param {Text} errorMessage
 */
export function setFeedback(noteContainer, inputContainer, errorMessage, type) {
  noteContainer.innerHTML = `<div class='${type}'>${errorMessage}</div>`;
  inputContainer.style.borderColor = "red";
}

/**
 * Clears message and border highlight
 * @param {HTMLElement} noteContainer
 * @param {HTMLElement} inputContainer
 */
export function clearFeedback(noteContainer, inputContainer) {
  noteContainer.innerHTML = "";
  inputContainer.style.borderColor = "";
}
