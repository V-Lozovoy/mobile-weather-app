// Babel: inline-import вшиває вміст .sql-файлів у бандл — без нього міграції
// drizzle не доїдуть до застосунку. Дано готовим: це єдине місце курсу, де
// збірку налаштовуємо руками.
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [['inline-import', { extensions: ['.sql'] }]],
  }
}
