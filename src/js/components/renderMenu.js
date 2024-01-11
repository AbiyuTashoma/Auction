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
