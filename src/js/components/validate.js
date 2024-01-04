/**
 * validates text length trimming spaces and checks for punctuation
 * @param {Text} stringValue
 * @param {Number} [minLenText] text length
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
 * validates email
 * @param {Text} emailValue
 * @returns {boolean}
 */
export function validateEmail(emailValue) {
  const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

export function validateLength(txt, minLen = 8, maxLen = 500) {
  const actualLength = txt.length;

  return actualLength >= minLen && actualLength <= maxLen;
}
