// ДАНО — не змінюйте. Metro за замовчуванням не знає розширення .sql, а
// drizzle-kit генерує drizzle/migrations.js, який імпортує саме .sql-файли.
// Без цих двох рядків (і плагіна inline-import у babel.config.js) бандл не
// збереться зовсім: «Unable to resolve module ./0000_....sql».
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)
config.resolver.sourceExts.push('sql')

module.exports = config
