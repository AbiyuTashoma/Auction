/**
 * Filters null/undefined value and replaces it with empty string
 * @param {Array} dJsn array of objects
 * @returns {Array}
 */
export async function cleanDescription(dJsn) {
  dJsn.forEach((element) => {
    if (!element["description"]) {
      element["description"] = "";
    }
  });

  return dJsn;
}
