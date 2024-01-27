/**
 * filters objects containing search value
 * @param {Response} sJsn json response object
 * @param {*} sTxt search text
 * @returns {object}
 */
export async function searchText(sJsn, sTxt) {
  const sResult = sJsn.filter(
    ({ title, description }) =>
      title.toLowerCase().includes(sTxt) ||
      description.toLowerCase().includes(sTxt),
  );

  return sResult;
}
