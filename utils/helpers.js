export function firstLetterUpper(theString) {
  var newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
  return newString;
}
