const { JLib } = require('../src/main/tools/JLib');

test('First Test', () => {
  expect(new JLib('test')).not.toBe('');
});
