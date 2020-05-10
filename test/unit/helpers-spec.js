const { expect } = require('chai');

const {
    capitalizeFirstLetter,
    clearEmptyObjFields
} = require('../../src/helpers');

describe('Helpers', () => {
    describe('capitalizeFirstLetter', () => {
        it('capitalizes the first letter of a string', () => {
            expect(capitalizeFirstLetter('card')).to.eql('Card');
        });
    });

    describe('clearEmptyObjFields', () => {
        it('removes undefined fields', () => {
            const obj = { anything: undefined };
            expect(clearEmptyObjFields(obj)).to.deep.eql({});
        });

        it('removes undefined fields and leaves regular ones defined', () => {
            const obj = { anything: undefined, next: true };
            expect(clearEmptyObjFields(obj)).to.deep.eql({ next: true });
        });

        it('leaves empty strings in the final object', () => {
            const obj = { anything: '' };
            expect(clearEmptyObjFields(obj)).to.deep.eql({ anything: '' });
        });
    });
});
