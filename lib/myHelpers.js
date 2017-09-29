exports.camelize = function (str) {
  return str
    // Remove any - or _ characters with a space
    .replace(/[-_]+/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}
exports.booleanArrayOrString = function (str) {
  if (str.toLowerCase() === 'yes') return true
  if (str.toLowerCase() === 'no') return false
  const arrayStr = str.split(', ')
  if (arrayStr.length > 1) return arrayStr
  return str
}
