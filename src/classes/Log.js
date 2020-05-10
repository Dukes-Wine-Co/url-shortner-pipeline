const { logWebProperties } = require('../constants');
const request = require('request-promise');

class Log {
    constructor(str) {
        Object.assign(this, JSON.parse(str));
    }

    isWebResponse() {
        return logWebProperties.every(prop => prop in this._source);
    }

    getLocationData(){
        const options = {
            url: `http://api.ipstack.com/${this._source.ip}`,
            qs: {
                access_key: process.env.IP_STACK_KEY, // eslint-disable-line camelcase
                output: 'json'
            }
        };

        return request(options)
            .catch(err => {
                console.error(err);
                return {};
            });
    }

    addReferrer(){
        return this._source.hasOwnProperty('referrer');
    }

    addOriginalPath() {
        return this._source.hasOwnProperty('originalPath');
    }

    async processLocationData(){
        const locationData = await this.getLocationData();
        if (locationData.success === 'false' || locationData.success === false){
            return {};
        }

        const { location, ...relevantData } = JSON.parse(locationData);
        return relevantData;
    }

    async processLog(){
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

            const locationData = await this.processLocationData();
            return { ...obj, ...locationData };
        }

        return '';
    }
}

module.exports = Log;
