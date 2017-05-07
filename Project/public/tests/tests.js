mocha.setup("bdd");
const { expect } = chai;

describe('Describe 1', () => {
    it('Test 1', () => {
        chai.assert(1 === 2);
    })
    it('Test 2', () => {
        throw new Error('Ne staa');
    })
}); 

mocha.run();