const { Storage } = require('@google-cloud/storage');

const storageInstance = new Storage();

module.exports = storageInstance;
