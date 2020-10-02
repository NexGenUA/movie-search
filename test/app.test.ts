import { $ } from '../src/main';

describe('Test JLib module', () => {
  let element;
  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  test('Create instance', () => {
    const result = { isElement: true, nativeElement: element };
    expect($(element)).toEqual(result);
  });
  test('On method', () => {
    expect($(element).on('click', () => {})).toBeInstanceOf(Object);
  });
});
