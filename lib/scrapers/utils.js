const toLowerCamelCase = (str) => {
  const cleanedStr = str.replace(/[^a-zA-Z0-9 ]/g, '');

  const words = cleanedStr.split(' ');

  const camelCaseStr = words.map((word, index) => {
    let casedWord;

    if (index === 0) {
      casedWord = word.toLowerCase();
    } else {
      casedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    return casedWord;
  }).join('');

  return camelCaseStr;
};

module.exports = {
  toLowerCamelCase,
};
