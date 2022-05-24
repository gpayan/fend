function displayScore(score){
    
    let sentiment = '';
    let color = '';
    
    switch(score){
        case 'P+':
            sentiment = 'Strong Positive';
            color = '#08FF00';
            break;
        case 'P':
            sentiment = 'Positive';
            color = '#15C310';
            break;
        case 'NEU':
            sentiment = 'Neutral';
            color = '#3494F3';
            break;
        case 'N':
            sentiment = 'Negative';
            color = '#F1A801';
            break;
        case 'N+':
            sentiment = 'Strong Negative';
            color = '#F12201';
            break;
        case 'NONE':
            sentiment = 'Without Polarity';
            color = '#BBBABA';
            break;
    };

    return {'sentiment' : sentiment, 'color' : color};
}

export { displayScore }