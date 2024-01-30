/**
 * validates, matches string and length
 * @param {Text} stringValue
 * @param {Number} [minLenText] minimum text length
 * @param {Number} [maxLenText] maximum text length
 * @returns {boolean}
 */
export function validateName(stringValue, minLenText = 1, maxLenText = 20) {
  const textLen = stringValue.trim().length;
  const res = textLen >= minLenText && textLen <= maxLenText;

  const nameRegEx = /\W/;
  const nameMatch = nameRegEx.test(stringValue);

  return res && !nameMatch;
}

/**
 * validates email and matches @stud.noroff.no
 * @param {Text} emailValue
 * @returns {boolean}
 */
export function validateEmail(emailValue) {
  const regEx = /^[\w-.]+@stud.noroff.no/;
  const match = regEx.test(emailValue);
  return match;
}

/**
 * validates url
 * @param {Text} urlValue
 * @returns {boolean}
 */
export function validateUrl(urlValue) {
  const urlHttps =
    /^(https:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  const urlHttp =
    /^(http:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  const urlMatch = urlHttp.test(urlValue) || urlHttps.test(urlValue);
  return urlMatch;
}

/**
 * Trims, checks length if it is within a given range
 * @param {string} txt
 * @param {Number} minLen
 * @param {Number} maxLen
 * @returns {Boolean}
 */
export function validateLength(txt, minLen = 8, maxLen = 500) {
  const actualLength = txt.trim().length;

  return actualLength >= minLen && actualLength <= maxLen;
}

/**
 * Validates whether a number is above 0
 * @param {Number} nbr
 * @returns
 */
export function validateNumber(nbr) {
  return nbr > 0;
}

/**
 * Validates whether a date is older or later than current date
 * @param {Date} dte date
 * @returns
 */
export function validateDate(dte) {
  const newDate = new Date();
  const dateDate = new Date(dte);
  return dateDate > newDate;
}
