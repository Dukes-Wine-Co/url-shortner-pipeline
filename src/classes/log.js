const { logWebProperties } = require('../constants');
const request = require('request-promise');
const UserAgent = require('./user-agent');
const DateInfo = require('./custom-date');

class Log {
    constructor(str) {
        this.source = JSON.parse(str)._source;
        this.logInfo = JSON.parse(str)._source.o__message;
    }

    isWebResponse() {
        if (this.logInfo){
            return logWebProperties.every(prop => prop in this.logInfo);
        }

        return false;
    }

    async getLocationData(){
        const options = {
            url: `http://api.ipstack.com/${this.logInfo.ip}`,
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
        return this.logInfo.hasOwnProperty('referrer');
    }

    addOriginalPath(){
        return this.logInfo.hasOwnProperty('originalPath');
    }

    processUserAgent(uaString){
        const ua = new UserAgent(uaString);
        return ua.flatten();
    }

    getDateInfo(){
        const timestamp = this.logInfo['timestamp'];
        return new DateInfo(timestamp).getDateInfo();
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
            const obj = this.processUserAgent(this.logInfo.userAgent);
            const dateInfo = this.getDateInfo();

            logWebProperties.forEach(prop => {
                obj[prop] = this.logInfo[prop];
            });

            obj.referer = this.addReferrer()
                ? this.logInfo.referrer
                : this.logInfo.referer;

            obj.originalPath = this.addOriginalPath()
                ? this.logInfo.originalPath
                : this.logInfo.originalURL;

            const locationData = await this.processLocationData();

            return {
                ...obj,
                ...locationData,
                ...dateInfo
            };
        }

        return '';
    }
}

module.exports = Log;
