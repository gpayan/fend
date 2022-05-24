import { checkForDataEntry } from '../client/js/nameChecker'

describe('Testing the checkForDataEntry function', () => {

    //alert('Input filed is empty') raise an error during testing. Please add comment slashes on it for testing.
    test('Testing if the function detects when no text is entered', () => {
        expect(checkForDataEntry('','url')).toBeFalsy();
    });

    test('Testing if the function detects a valid URL', () => {
        expect(checkForDataEntry('https://www.google.com', 'url')).toBeTruthy();
    });

    //alert('URL format is not valid') raise an error during testing. Please add comments slashes on it for testing.
    test('Testing of the function detects an invalid URL', () => {
        expect(checkForDataEntry('htp/google', 'url')).toBeFalsy();
    });

});
