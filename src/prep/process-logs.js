const Log = require('../classes/Log');
const fs = require('fs');
const readline = require('readline');

const formatObj = obj => {
    for (const key in obj){
        obj[key] = obj[key] + '';
    }

    return obj;
};

async function processLineByLine() {
    const filePath = `${process.argv[2]}`;
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const log = new Log(line);
        if (log.processLog()){
            const obj = typeof log === 'string' ? '' : formatObj(log.processLog());
            console.log(JSON.stringify(obj));
        }
    }
}

processLineByLine();
