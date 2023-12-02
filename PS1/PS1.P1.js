/* Write a function that takes a string as its input and returns a new string that contains all of the
letters in the original string, but in reverse alphabetical order. Ignore punctuation and numbers */

const reverseAlphabeticalOrder = (str) => {
    return str
        .replace(/[^a-zA-Z]/g, '')
        .split('')
        .sort()
        .reverse()
        .join('');
};

console.log(reverseAlphabeticalOrder('supercalifragilisticexpialidocious'));

