const dummy = require('./dummy_function');

test('always returns true', () => {
  expect(dummy(true)).toBe(true);
});