const storage = require('../../storage/google-cloud-client');
const bucket = storage.bucket('shortened-urls-beta');
const fs = require('fs');

const downloadAndWriteFile = async (file) => {
    const fileName = file.id;

    const fileData = await file.download();
    fs.writeFileSync(`tmp-objs/${fileName}`, fileData[0]);
};

bucket.getFiles()
    .then(function(data) {
        const files = data[0];
        return Promise.all(files.map(file => downloadAndWriteFile(file)));
    })
    .catch(e => {
        console.error(`There was an error returing the files from storage: ${e}`);
    });
