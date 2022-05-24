 import { checkForDataEntry } from './nameChecker';
 import { displayScore } from './displayScore';
 
 function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    console.log('event that we have received: ', event);

    let typeOfText = document.querySelector('input[name="typeOfText"]:checked').getAttribute('value');
    console.log('type of text is: ', typeOfText);

    const goodToGo = checkForDataEntry(formText, typeOfText);
    console.log('value de goodToGo: ', goodToGo);

    if (goodToGo) {
        let data_to_send = {
            message: formText,
            textType: typeOfText
        };
    
        console.log("::: Form Submitted :::");
        fetch('http://localhost:8081/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_send)
        })
        .then(res => {
            console.log(typeof(res));
            return res.json();
        })
        .then(data => {
            console.log(data);
            const data_to_display = displayScore(data.score);
            const newElement = document.createElement('div');
            newElement.classList.add('result-container');
            
            const newElement2 = document.createElement('div');
            newElement2.classList.add('result-line');
    
            const newDiv1 = document.createElement('div');
            newDiv1.innerText = data_to_send.message;
            newDiv1.classList.add('sentence-grid');
    
            const newDiv2 = document.createElement('div');
            newDiv2.innerHTML = `<span style="color: ${data_to_display.color}">${data_to_display.sentiment}</span>`;
            newDiv2.classList.add('score-grid');
    
            const newDiv3 = document.createElement('div');
            newDiv3.classList.add('colored-point');
            newDiv3.style.backgroundColor = data_to_display.color;
    
            newElement2.append(newDiv1);
            newElement2.append(newDiv2);
            newElement2.append(newDiv3);
    
            newElement.append(newElement2);
    
            //newElement.innerHTML = `${data_to_send.message} has a score of: <span style="color: ${data_to_display.color}">${data_to_display.sentiment}</span>`;
            //newElement.classList.add('display-results');
            document.getElementById('results').appendChild(newElement);
        });
    } else {
        console.log('Need to clear the text field for new entry');
        document.getElementById('name').value = "";
    }
    

}

export { handleSubmit }