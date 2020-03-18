const webProperties = [
    'message',
    'timestamp',
    'statusCode',
    'requestHost',
    'userAgent',
    'ip',
    'acceptLanguage',
    'domain',
    'correlationId',
    'redirectedUrl',
    '_lid'
];

class Log {
    constructor(str) {
        Object.assign(this, JSON.parse(str));
    }

    isWebResponse() {
        return webProperties.every(prop => prop in this._source);
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
            webProperties.forEach(prop => {
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
