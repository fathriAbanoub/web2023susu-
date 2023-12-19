const assert = require('assert'),
    core = require('./core');

// Test suite for core.js tasks
describe('Core JS tasks', () => {

    // Test suite for isInteger function
    describe('#isInteger', () => {
        it('Returns true for an integer', () => {
            assert.equal(core.isInteger(3), true);
        });

        it('Returns false for a non-integer', () => {
            assert.equal(core.isInteger(1.2), false);
        });
    });

    // Test suite for even function
    describe('#even', () => {
        it('Returns a correct array', () => {
            assert.deepStrictEqual(
                core.even(),
                [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
            );
        });
    });

    // Test suite for sumTo function
    describe('#sumTo', () => {
        it('Returns the sum of numbers up to n', () => {
            assert.equal(core.sumTo(4), 10, 'With a small number');
            assert.equal(core.sumTo(100), 5050, 'With a large number');
        });
    });

    // Test suite for recSumTo function
    describe('#recSumTo', () => {
        it('Returns the sum of numbers up to n (recursive)', () => {
            assert.equal(core.recSumTo(4), 10, 'With a small number');
            assert.equal(core.recSumTo(100), 5050, 'With a large number');
        });
    });

    // Test suite for factorial function
    describe('#factorial', () => {
        it('Returns the factorial of n', () => {
            assert.equal(core.factorial(5), 120);
            assert.equal(core.factorial(4), 24);
        });
    });

    // Test suite for isBinary function
    describe('#isBinary', () => {
        it('Returns true for a power of two', () => {
            assert.equal(core.isBinary(1), true);
            assert.equal(core.isBinary(2), true);
            assert.equal(core.isBinary(2048), true);
        });

        it('Returns false for a non-power of two', () => {
            assert.equal(core.isBinary(0), false);
            assert.equal(core.isBinary(12), false);
            assert.equal(core.isBinary(1023), false);
        });
    });

    // Test suite for fibonacci function
    describe('#fibonacci', () => {
        it('Returns the nth Fibonacci number correctly', () => {
            assert.equal(core.fibonacci(1), 1);
            assert.equal(core.fibonacci(2), 1);
            assert.equal(core.fibonacci(7), 13);
            assert.equal(core.fibonacci(10), 55);
        });
    });

    // Test suite for getOperationFn function
    describe('#getOperationFn', () => {
        it('Returns a function', () => {
            const sumFn = core.getOperationFn(-1, (a, b) => a + b);
            assert.ok(typeof sumFn === 'function');
        });

        it('Stores internal value and applies the operation', () => {
            const multFn = core.getOperationFn(-1, (a, b) => a * b);
            assert.strictEqual(multFn(-1), 1);
            assert.strictEqual(multFn(4), 4);
            assert.strictEqual(multFn(2), 8);
        });

        it('Defaults to always returning the initial value if no operatorFn is provided', () => {
            const staticFn = core.getOperationFn(-1);
            assert.strictEqual(staticFn(-1), -1);
            assert.strictEqual(staticFn(7), -1);
            assert.strictEqual(staticFn(0), -1);
        });
    });

    // Test suite for sequence function
    describe('#sequence', () => {
        it('Returns a function with step 1 and start 0 if no values are provided', () => {
            const generator = core.sequence();
            assert.equal(generator(), 0);
            assert.equal(generator(), 1);
            assert.equal(generator(), 2);
        });

        it('Generates values correctly starting from start with step step', () => {
            const generator1 = core.sequence(10, 3);
            const generator2 = core.sequence(8, 2);
            assert.equal(generator1(), 10);
            assert.equal(generator1(), 13);
            assert.equal(generator2(), 8);
            assert.equal(generator1(), 16);
            assert.equal(generator2(), 10);
        });
    });

    // Test suite for deepEqual function
    describe('#deepEqual', () => {
        const dummyFunction = () => { };

        it('Returns true if objects are equal', () => {
            assert.equal(
                core.deepEqual(
                    { text: 'some text', count: 3, arr: [11, 22] },
                    { text: 'some text', count: 3, arr: [11, 22] }
                ),
                true
            );
            assert.equal(
                core.deepEqual(
                    { obj: { count: 12 }, value: null, flag: true },
                    { obj: { count: 12 }, value: null, flag: true }
                ),
                true
            );
            assert.equal(
                core.deepEqual(
                    { obj: { arr: ['a', 'b'] }, value: undefined },
                    { obj: { arr: ['a', 'b'] }, value: undefined }
                ),
                true
            );
            assert.equal(
                core.deepEqual({ func: dummyFunction }, { func: dummyFunction }),
                true
            );
            assert.equal(
                core.deepEqual({ a: 'a', b: 'b' }, { b: 'b', a: 'a' }),
                true
            );
            assert.equal(core.deepEqual(NaN, NaN), true);
        });

        it('Returns false if objects are not equal', () => {
            assert.equal(
                core.deepEqual(
                    { text: 'some text', count: 3, arr: [11, 22] },
                    { text: 'some text1', count: 4, arr: [11, 22] }
                ),
                false
            );
            assert.equal(
                core.deepEqual(
                    { obj: { count: 12 }, value: null, flag: true },
                    { obj: { count: 22 }, value: null, flag: false }
                ),
                false
            );
            assert.equal(
                core.deepEqual(
                    { obj: { arr: ['a', 'b'] }, value: undefined },
                    { obj: { arr: ['a', 'b'] }, value: null }
                ),
                false
            );
            assert.equal(
                core.deepEqual(
                    { obj: { arr: [1, 2, 3] }, value: 'null', n: 0 },
                    { obj: { arr: [1, 2] }, value: 'null', n: 0 }
                ),
                false
            );
            assert.equal(
                core.deepEqual({ obj: { arr: [1, 0] } }, { obj: { arr: [1, null] } }),
                false
            );
            assert.strictEqual(core.deepEqual(0, 1), false);
            assert.strictEqual(core.deepEqual(null, 0), false);
            assert.strictEqual(core.deepEqual(null, undefined), false);
            assert.equal(
                core.deepEqual({ func: dummyFunction }, { func: () => { } }),
                false
            );
        });
    });
});
