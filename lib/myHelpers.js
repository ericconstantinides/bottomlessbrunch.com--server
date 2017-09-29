exports.camelize = function (str) {
  return str
    // Remove any - or _ characters with a space
    .replace(/[-_]+/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}
exports.booleanOrString = function (str) {
  if (str.toLowerCase() === 'yes') return true
  if (str.toLowerCase() === 'no') return false
  return str
}
