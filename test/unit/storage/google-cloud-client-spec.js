const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Google Cloud Client', () => {
    const storageStub = sinon.stub();

    const gcloudClient = proxyquire('../../../storage/google-cloud-client', {
        '@google-cloud/storage': {
            Storage: storageStub
        }
    });

    it('initializes a new object', () => {
        gcloudClient;
        expect(storageStub).to.have.been.called;
    });
});
