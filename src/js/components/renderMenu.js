/**
 * Displays and hides html elements based on login status
 * @param {Boolean} status login status
 * @param {string} lgdOut class name
 * @param {string} lgdIn class name
 */
export function renderMenu(status, lgdOut, lgdIn) {
  if (status) {
    lgdOut.forEach((item) => {
      item.style.display = "none";
    });

    lgdIn.forEach((ele) => {
      ele.style.display = "block";
    });
  } else {
    lgdIn.forEach((item) => {
      item.style.display = "none";
    });

    lgdOut.forEach((ele) => {
      ele.style.display = "block";
    });
  }
}
