const { RuleTester } = require('eslint');
const rule = require('./index').rules['no-direct-init'];

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    env: {
        es6: true,
    }
});

ruleTester.run('no-direct-init', rule, {
    valid: [
        {
            code: "let client; client ??= new client();",
            options: [['client']],
        },
        {
            code: "let client; client = client || new client();",
            options: [['client']],
        },
        {
            code: "const client = new client();",
            options: [['someOtherClass']],
        },
    ],
    invalid: [
        {
            code: "const client = new client();",
            options: [['client']],
            errors: [{ message: "Direct initialization of 'client' is forbidden." }],
        },
    ],
});

describe('no-direct-init rule configuration', () => {
    test('should throw an error when no forbidden classes are provided', () => {
        expect(() => {
            rule.create({
                options: [],
                report: jest.fn(),
            });
        }).toThrow(
            "The 'no-direct-init' rule requires at least one class to be forbidden. Please configure the rule properly."
        );
    });
});
