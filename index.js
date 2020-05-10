const UA = require('./src/classes/user-agent');
const { clearEmptyObjFields } = require('./src/helpers');

ua = new UA('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55.0');

console.log(clearEmptyObjFields(ua.flatten()));
