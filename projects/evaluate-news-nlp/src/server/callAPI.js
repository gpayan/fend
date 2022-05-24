const https = require('https');

module.exports = function callAPI(options){
    return new Promise((resolve, reject) => {
        const apiRequest = https.request(options, (res) => {
            let data_collected = '';

            res.on('data', (chunk) => {
                data_collected += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data_collected));
            });
        }).on('error', (err) => {
            reject(err);
        });

        apiRequest.end();

    });
};