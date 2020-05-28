const { logWebProperties } = require('../constants');
const request = require('request-promise');
const UserAgent = require('./user-agent');
const DateInfo = require('./custom-date');

class Log {
    constructor(str) {
        Object.assign(this, JSON.parse(str));
    }

    isWebResponse() {
        return logWebProperties.every(prop => prop in this._source);
    }

    async getLocationData(){
        const options = {
            url: `http://api.ipstack.com/${this._source.ip}`,
            qs: {
                access_key: process.env.IP_STACK_KEY, // eslint-disable-line camelcase
                output: 'json'
            }
        };

        try {
            return await request(options);
        } catch (e){
            return '{}';
        }
    }

    addReferrer(){
        return this._source.hasOwnProperty('referrer');
    }

    addOriginalPath(){
        return this._source.hasOwnProperty('originalPath');
    }

    processUserAgent(uaString){
        const ua = new UserAgent(uaString);
        return ua.flatten();
    }

    getDateInfo(){
        const timestamp = this._source[prop];
        return new DateInfo(timestamp);
    }

    async processLocationData(){
        const locationData = await this.getLocationData();
        const locationObj = JSON.parse(locationData);
        if (locationObj.success === 'false' || locationObj.success === false){
            return {};
        }

        const { location, ...relevantData } = JSON.parse(locationData);
        return relevantData;
    }

    async processLog(){
        if (this.isWebResponse()) {
            const obj = this.processUserAgent(this._source.userAgent);
            const dateInfo = this.getDateInfo();

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
            return { ...obj, ...locationData, ...dateInfo };
        }

        return '';
    }
}

module.exports = Log;
