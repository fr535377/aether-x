function isValidHexColor(str) {
  return /^#?[0-9A-F]{6}$/i.test(str);
}

function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = {
  isValidHexColor,
  isValidURL
};
