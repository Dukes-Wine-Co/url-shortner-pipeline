const goodLogString = {
    '_source': {
        '_host': 'dwc-url-shortner',
        '_logtype': 'json',
        '_file': 'app[web]',
        '_line': '<190>1 2020-02-26T23:17:36.391743+00:00 host app web.1 - \u001b[32minfo\u001b[39m: {"message":"Incoming request for testing3","statusCode":200,"requestHost":"","originalURL":"/testing3","referrer":"","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36","ip":"8.45.104.20","acceptLanguage":"en-US,en;q=0.9","domain":"www.dukes.wine","correlationId":"7aa21bb7-0ad6-4bd8-9c35-8e89072e9ef2","redirectedUrl":"","timestamp":1582759056391}',
        '_ts': 1582759057731,
        '_app': 'app[web]',
        '_ip': '10.233.111.86',
        'dyno': 'web.1',
        'message': 'Incoming request for testing3',
        'level': 'info',
        'timestamp': 1582759056391,
        'statusCode': 200,
        'requestHost': '',
        'originalURL': '/testing3',
        'referrer': '',
        'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'ip': '8.45.104.20',
        'acceptLanguage': 'en-US,en;q=0.9',
        'domain': 'www.dukes.wine',
        'correlationId': '7aa21bb7-0ad6-4bd8-9c35-8e89072e9ef2',
        'redirectedUrl': '',
        '_lid': '1185977446877786112'
    }
}

module.exports = {
    goodLogString
};
