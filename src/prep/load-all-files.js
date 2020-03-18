const storage = require('../../storage/google-cloud-client');
const bucket = storage.bucket('shortened-urls-beta');
const fs = require('fs');

const downloadAndWriteFile = file => {
    const fileName = file.id;

    file.download()
        .then(data => {
            const contents = data[0];
            fs.writeFileSync(`tmp-objs/${fileName}`, contents);
        });
};

bucket.getFiles()
    .then(function(data) {
        const files = data[0];
        return Promise.all(files.map(file => downloadAndWriteFile(file)));
    })
    .catch(e => {
        console.error(`There was an error returing the files from storage: ${e}`);
    });
