const translate = require('translate');
translate.engine = ENGINE;
translate.key = API_KEY;

module.exports = {
  translate: async (inputText, language, translateTo) => await translate(inputText, {
    from: language.substring(0, 2).toLowerCase(),
    to: translateTo.substring(0, 2).toLowerCase()
  })
};
