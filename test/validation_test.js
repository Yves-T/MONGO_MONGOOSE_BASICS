const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it("requires a user's name longer than 2 characters", () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('disallow invalid records from being saved', async () => {
    const user = new User({ name: 'Al' });
    try {
      await user.save();
      assert(true === false); // should never come here
    } catch (validationResult) {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters');
    }
  });
});
