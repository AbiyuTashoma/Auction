export function toArray(str, spliter) {
  const strArray = str.split(`${spliter}`);
  let urlArray = [];
  strArray.forEach((element) => {
    urlArray.push(element.trim());
  });

  return urlArray;
}
