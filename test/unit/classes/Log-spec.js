const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const Log = require('../../../src/classes/Log');
const testData = require('../test-data/logs');
const { logWebProperties } = require('../../../src/constants');

describe('Log', () => {
    const formattedGoodLog = JSON.stringify(testData.goodLogString);
    const goodLog = new Log(formattedGoodLog);

    beforeEach(() => {

    });

    describe('constructor', () => {
        it('sets the stringified object as an object', () => {
            expect(goodLog).to.deep.eql(testData.goodLogString)
        });
    });

    describe('isWebResponse', () => {
        it('returns true when a log has all of the required webProperties', () => {
            expect(goodLog.isWebResponse()).to.be.true;
        });
    });

    describe('addReferrer', () => {
        const logWReferrer = new Log(JSON.stringify({_source: {referrer: true}}));
        const logWOReferrer = new Log(JSON.stringify({_source: {referer: true}}));

        it('returns true when the log has the key referrer', () => {
            expect(logWReferrer.addReferrer()).to.be.true;
        });

        it('returns false when the log does not have the key referrer', () => {
            expect(logWOReferrer.addReferrer()).to.be.false;
        });
    });

    describe('addOriginalPath', () => {
        const logWaddOriginalPath = new Log(JSON.stringify({_source: {originalPath: true}}));
        const logWOaddOriginalPath = new Log(JSON.stringify({_source: {}}));

        it('returns true when the log has the key addOriginalPath', () => {
            expect(logWaddOriginalPath.addOriginalPath()).to.be.true;
        });

        it('returns false when the log does not have the key addOriginalPath', () => {
            expect(logWOaddOriginalPath.addOriginalPath()).to.be.false;
        });
    });

    describe('processedLogs', () => {
        it('has all of the expected web properties in the processed log', () => {
            const expectedKeys = [...logWebProperties, 'referer', 'originalPath']
            expect(goodLog.processLog()).to.be.an('object').with.all.keys(expectedKeys);
        });
    })
});
