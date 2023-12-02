// Fibonacci Generator
function* fibs (x = 0) {
    let [val1, val2, result] = [x,x-1,0];
    while (true) {
    if(val1 === 0){
        [val1, val2, result] = [0, 1, 0]
        yield 0
    }
    result = val1+val2
    val1 = val2
    val2 = result
    yield result
    }
}

// Even Fibonacci Generator
function* evenFibs (){
    let f = fibs();
    f.next()
    while(true){
        while(true){
            let temp = f.next().value;
            if(temp%2 === 0){
                yield temp
            }
        }
    }
}

//Get the first six even fibs
   const myEvenFibs = evenFibs(0) //not really fib(4), just shows passing param
   let count = 6;
   while (count --> 0) {
    console.log(myEvenFibs.next().value)
   } 