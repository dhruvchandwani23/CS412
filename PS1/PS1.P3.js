const apply = (str, func) => {
    const transformed = func(str)
    return transformed
}

const myFunction1 = str => str.split(/(?=c)/)

console.log(apply('supercalifragilisticexpialidocious',myFunction1))

const myFunction2 = str => str.replace(/a/g, 'A')

function countOccurrences(str, character) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === character) {
            count++;
        }
    }
    return count;
}

const myObject = new Object();
    myObject.originalString = 'supercalifragilisticexpialidocious';
    myObject.modifiedString = apply('supercalifragilisticexpialidocious',myFunction2);
    myObject.numberReplaced = countOccurrences((apply('supercalifragilisticexpialidocious',myFunction2)));
    myObject.length = ('supercalifragilisticexpialidocious').length

console.log(myObject)

