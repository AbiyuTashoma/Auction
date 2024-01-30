/**
 * creates an array of a strings by splitting at specified character string
 * @param {string} str
 * @param {string} spliter
 * @returns {Array}
 */
export function toArray(str, spliter) {
  const strArray = str.split(`${spliter}`);
  let urlArray = [];
  strArray.forEach((element) => {
    urlArray.push(element.trim());
  });

  return urlArray;
}
