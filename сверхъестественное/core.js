// Write a function that checks if a number is an integer using bitwise operators
function isInteger(n) {
    return (n ^ 0) === n;
}

// Write a function that returns an array of even numbers from 2 to 20 (inclusive)
function even() {
    return [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
}

// Write a function that calculates the sum of numbers up to a given value using a loop
function sumTo(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) sum += i;

    return sum;
}

// Write a function that calculates the sum of numbers up to a given value using recursion
function recSumTo(n) {
    if (n <= 0) return 0;

    return n + recSumTo(n - 1);
}

// Write a function that calculates the factorial of a given number
function factorial(n) {
    let result = 1;

    for (let i = 1; i <= n; i++) result *= i;

    return result;
}

// Write a function that determines if a number is a power of two
function isBinary(n) {
    return (n != 0) && ((n & (n - 1)) == 0);
}

// Write a function that finds the Nth Fibonacci number
function fibonacci(n) {
    if (n <= 0) return 0;
    else if (n == 1) return 1;

    return fibonacci(n - 1) + fibonacci(n - 2);
}

/** Write a function that takes an initial value and an operation function
 * and returns a function that performs that operation.
 * If the operation function (operatorFn) is not provided, it defaults to always
 * returning the initial value (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn = getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    if (operatorFn == null) return () => initialValue;

    return (number) => {
        initialValue = operatorFn(initialValue, number);
        return initialValue;
    }
}

/**
 * Write a function to create a generator for an arithmetic sequence.
 * When called, it returns a new generator function - generator().
 * Each call to the generator function returns the next element in the sequence.
 * If the start value is not provided, it defaults to 0.
 * If the step is not specified, it defaults to 1.
 * Multiple generators can be created - they are all independent.
 *
 * @param {number} start - the number from which the sequence starts
 * @param {number} step  - the step of the sequence
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    start -= step;

    return () => {
        start += step;
        return start;
    };
}

/**
 * Write a function deepEqual that takes two values
 * and returns true only if they have the same value
 * or are objects with the same properties,
 * and their values are also equal when compared with a recursive call to deepEqual.
 * Considering specific objects (such as Date, RegExp, etc.) is not necessary.
 *
 * @param {object} firstObject - the first object
 * @param {object} secondObject - the second object
 * @returns {boolean} - true if the objects are equal (in content), otherwise false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject || Number.isNaN(firstObject) && Number.isNaN(secondObject)) return true;

    if (firstObject === null || secondObject === null || typeof firstObject !== 'object' || typeof secondObject !== 'object') return false;

    const firstObjectKeys = Object.keys(firstObject);
    const secondObjectKeys = Object.keys(secondObject);

    if (firstObjectKeys.length !== secondObjectKeys.length) return false;

    for (let key in firstObject) {
        if (!secondObjectKeys.includes(key) || !deepEqual(firstObject[key], secondObject[key])) return false;
    }

    return true;
}

if (typeof module === 'object') {
    module.exports = {
        isInteger,
        even,
        sumTo,
        recSumTo,
        factorial,
        isBinary,
        fibonacci,
        getOperationFn,
        sequence,
        deepEqual,
    };
}
