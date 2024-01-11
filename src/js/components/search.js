export function searchText(sJsn, sTxt) {
  const sResult = sJsn.filter(
    ({ title, description }) =>
      title.toLowerCase().includes(sTxt) ||
      description.toLowerCase().includes(sTxt),
  );

  return sResult;
}
