function* words(str = ""){
    let x = str.split(' ');
    for (let w of x) {
        yield w
    }
}

const gen = words("All I know is something like a bird within her sang");
let result = gen.next();
while (!result.done) {
    console.log(result.value);
    result = gen.next();
}