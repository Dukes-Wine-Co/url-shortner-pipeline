const { logWebProperties } = require('../constants');

class Log {
    constructor(str) {
        Object.assign(this, JSON.parse(str));
    }

    isWebResponse() {
        return logWebProperties.every(prop => prop in this._source);
    }

    addReferrer(){
        return this._source.hasOwnProperty('referrer');
    }

    addOriginalPath(){
        return this._source.hasOwnProperty('originalPath');
    }

    processLog(){
        if (this.isWebResponse()) {
            const obj = {};
            logWebProperties.forEach(prop => {
                obj[prop] = this._source[prop];
            });

            obj.referer = this.addReferrer()
                ? this._source.referrer
                : this._source.referer;

            obj.originalPath = this.addOriginalPath()
                ? this._source.originalPath
                : this._source.originalURL;

            return obj;
        }

        return '';
    }
}

module.exports = Log;
