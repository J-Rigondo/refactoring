const statement = require('./statement');
const outOfSwitch = require('./outOfSwitch');
const invoices = require('./data/invoices.json');
const plays = require('./data/plays.json');

const statementResult = `청구 내역 (고객명: BigCo)
 Hamlet: $650.00 (55석)
 As You Like It: $580.00 (35석)
 Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`

describe('statement refactoring', () => {

    test('statement result is same', () => {
        expect(statement(invoices[0], plays)).toBe(statementResult);
    });

    test('out of switch func is same result', () => {
        expect(outOfSwitch(invoices[0], plays)).toBe(statementResult);
    });



})

