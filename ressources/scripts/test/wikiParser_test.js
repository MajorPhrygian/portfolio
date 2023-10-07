const assert = require('assert');
const { splitInWords, assembleWords, createURL } = require('../wikiParser');
var chai = require('chai');


describe('inputFormatter()', () => {
    let testString;
    let returnedValue;

    it('returns null if no words', () => {
        testString = '    ';
        returnedValue = splitInWords(testString);

        assert.strictEqual(returnedValue, null);
    });

    it('returns null if not a string', () => {
        testString = 3;
        returnedValue = splitInWords(testString);

        assert.strictEqual(returnedValue, null);
    });

    it('returns the right type', () => {
        testString = 'There is four words';
        returnedValue = splitInWords(testString);

        assert.strictEqual(typeof returnedValue, 'object');
    });

    it('returns an array of strings', () => {
        testString = 'There is four words';
        returnedValue = splitInWords(testString);

        assert.strictEqual(typeof returnedValue[0], 'string');
    });

    it('returns an array of the right size', () => {
        testString = 'There is four words';
        returnedValue = splitInWords(testString);

        assert.strictEqual(returnedValue.length, 4);
    });
});

describe('assembleWords()', () => {
    let testArray;
    let returnedValue;
    let expected;

    it('assembles words with underscores', () => {
        testArray = ['a', 'pretty', 'cat'];
        returnedValue = assembleWords(testArray);
        expected = 'A_pretty_cat';

        assert.strictEqual(returnedValue, expected);
    });

    it('assembles words with underscores 2', () => {
        testArray = ['amazing', 'pretty', 'cat'];
        returnedValue = assembleWords(testArray);
        expected = 'Amazing_pretty_cat';

        assert.strictEqual(returnedValue, expected);
    });
});

describe('createURL()', () => {
    let testString = 'John_Wilkes_Booth'
    let expected = 'https://en.wikipedia.org/wiki/John_Wilkes_Booth';
    let result;

    it('creates the URL', () => {
        result = createURL(testString);

        assert.strictEqual(result,expected);
    });
});