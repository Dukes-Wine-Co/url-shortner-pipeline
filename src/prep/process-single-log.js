const Log = require('../classes/log');
const singleLog = {"_source":{"_host":"dwc-url-shortner","_logtype":"json","_file":"app[web]","_line":"<190>1 2020-02-26T23:17:24.232913+00:00 host app web.1 - \u001b[32minfo\u001b[39m: {\"message\":\"Incoming request for tyrone\",\"statusCode\":200,\"requestHost\":\"\",\"originalURL\":\"/tyrone\",\"referrer\":\"\",\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36\",\"ip\":\"8.45.104.20\",\"acceptLanguage\":\"en-US,en;q=0.9\",\"domain\":\"www.dukes.wine\",\"correlationId\":\"88d2c492-855e-4ab7-9c15-fd93ecd7d233\",\"redirectedUrl\":\"\",\"timestamp\":1582759044232}","_ts":1582759044591,"_app":"app[web]","_ip":"10.233.93.137","dyno":"web.1","message":"Incoming request for tyrone","level":"info","timestamp":1582759044232,"statusCode":200,"requestHost":"","originalURL":"/tyrone","referrer":"","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36","ip":"8.45.104.20","acceptLanguage":"en-US,en;q=0.9","domain":"www.dukes.wine","correlationId":"88d2c492-855e-4ab7-9c15-fd93ecd7d233","redirectedUrl":"","_lid":"1185977391764279296"}}
const logInfo = JSON.stringify(singleLog);
const log = new Log(logInfo);

(async () => {
    const processedLog = await log.processLog();
    console.log(processedLog)
})()

