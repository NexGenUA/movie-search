import { $ } from '../src/main/tools/JLib';

test('First Test', () => {
  expect(new $('test')).not.toBe('');
});


// "test": "jest --testMatch \"<rootDir>/test/*.test.+(ts|tsx)\" --noStackTrace"