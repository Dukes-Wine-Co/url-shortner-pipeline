const Log = require('../classes/log');
const fs = require('fs');
const readline = require('readline');

const formatObj = obj => {
    for (const key in obj){
        obj[key] = obj[key] + '';
    }

    return obj;
};

const processLineByLine = async() => {
    const filePath = `${process.argv[2]}`;
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const log = new Log(line);
        const processedLog = await log.processLog();
        if (processedLog){
            const obj = typeof log === 'string' ? '' : formatObj(processedLog);
            console.log(JSON.stringify(obj));
        }
    }
};

(async() => {
    try {
        await processLineByLine();
    } catch (e) {
        throw `There was an error processing a file from storage: ${e}`;
    }
})();
