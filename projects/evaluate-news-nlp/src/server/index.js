//calling callAPI function
const callAPI = require('./callAPI');

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config();

const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'));

//Initializing values to configure POST object for API call
const lang = 'en';
const model = 'general';

//Managing access right to APIs with Cors
app.use(cors({
    origin: '*'
}));

console.log(__dirname);

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
});

app.post('/', async (req, res) => {
    console.log('We just received a POST request');
    console.log(req.body);

    let path_to_send = '';

    switch(req.body.textType){
        case 'text':
            let sentenceEncoded = encodeURI(req.body.message);
            path_to_send = `/sentiment-2.1?key=${process.env.APPLICATION_ID}&lang=${lang}&txt=${sentenceEncoded}\"&model=${model}`;
            break;
        case 'url':
            path_to_send = `/sentiment-2.1?key=${process.env.APPLICATION_ID}&lang=${lang}&url=${req.body.message}\"&model=${model}`;
            break;
    };
    
    let options = {
        'method': 'GET',
        'hostname': 'api.meaningcloud.com',
        'path': path_to_send,
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    let sentimentAnalysis = await callAPI(options);
  
    /*
    console.log('Value of sentimentAnalysis: ', sentimentAnalysis);
    console.log(typeof(sentimentAnalysis));
    console.log('Value de sentiment in sentimentAnalysis ', sentimentAnalysis.sentence_list);
    console.log('type of sentimentAnalysis.sentence_list[0] ', typeof(sentimentAnalysis.sentence_list[0]));
    console.log('value of sentimentAnalysis.sentence_list[0] ', sentimentAnalysis.sentence_list[0]);
    console.log('score tag is: ', sentimentAnalysis.sentence_list[0].score_tag);
    */

    console.log('Result of the call: ', sentimentAnalysis);

    res.send(JSON.stringify({'score': sentimentAnalysis.sentence_list[0].score_tag}));

});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});