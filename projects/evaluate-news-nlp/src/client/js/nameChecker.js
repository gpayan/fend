function checkForDataEntry(inputText, typeOfText) {

    if (!inputText) {
    //    alert('Input field is empty');
        return false;
    }

/*    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
*/  

    if (typeOfText === 'url'){
        const res = inputText.match(/(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res !== null) {
            console.log('The URL is verified');
            return true;
        } else {
            console.log('URL is invalid');
        //    alert('URL format is not valid');
            return false;
        };
    };

    return true;
}

export { checkForDataEntry }