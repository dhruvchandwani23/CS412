const parseExpression = (expression) => {
    const [left, operator, right] = expression;
    return { left: parseInt(left), operator, right: parseInt(right) };
};

const evaluate = (expression) => {
    const { left, operator, right } = parseExpression(expression);
    switch (operator) {
        case '+': return (l, r) => l + r;
        case '-': return (l, r) => l - r;
        case '*': return (l, r) => l * r;
        case '/': return (l, r) => l / r;
        case '^': return (l, r) => Math.pow(l, r);
        default: throw new Error('Invalid operator');
    }
};

const expressions = ['4+2', '5*7', '6-1', '9/2', '2^8'];
expressions.forEach(expression => {
    let operatorFunc = evaluate(expression);
    console.log(`${expression} = ${operatorFunc(parseInt(expression[0]), parseInt(expression[2]))}`);
});
