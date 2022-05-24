# Sentiment.AI

Sentiment.AI lets you type text or enter a URL and gives you back the sentiment of the sentence or text provided. 

## Table of Contents

* [Getting started](#getting-started)
* [Text or URL](#text-or-url)

## Getting started

To set-up the website and server, unzip the file. 

* server runs on port: 8081
* NLP solution provided by: MeaningCloud
* Need to create .env file at project root and add API key to access MeaningCloud:  

```
APPLICATION_ID = '<----add-your-own-key---->'
```

## Text or URL

User has to enter a string in the text box, then select wether it's a URL or Text and click on the "Launch analysis" button.

### Validation of input text
If the text field is empty, no action will be performed and a pop-up window invites the user to enter some text. 

URL format is also verified - through regular expressions. If the format of the URL is not accepted, a pop-up window invites the user to re-enter a valid URL.