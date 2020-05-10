const UAParser = require('ua-parser-js');
const { capitalizeFirstLetter, clearEmptyObjFields } = require('../helpers');

class UserAgent {
    constructor(uaString){
        Object.assign(this, UAParser(uaString));
    }

    flatten(){
        const flattenKeys = [
            'browser',
            'engine',
            'os',
            'device',
            'cpu'
        ];

        const finalObj = {
            userAgent: this.ua
        };

        flattenKeys.forEach(key => {
            const currObj = this[key];
            const objKeys = Object.keys(currObj);

            objKeys.forEach(innerKey => {
                const newKeyName = `${key}${capitalizeFirstLetter(innerKey)}`
                finalObj[newKeyName] = currObj[innerKey];
            })
        })

        return clearEmptyObjFields(finalObj);
    }
}

module.exports = UserAgent;
