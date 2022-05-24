import { displayScore } from "../client/js/displayScore";

describe("Testing the displayScore functionality", () => {
    
    test("Testing that displayScore function is defined", () => {
        expect(displayScore).toBeDefined();
    });

    test("Testing the result of displayScore", () => {
        expect(displayScore('P+')).toEqual({'sentiment' : 'Strong Positive', 'color' : '#08FF00'});
    });

});