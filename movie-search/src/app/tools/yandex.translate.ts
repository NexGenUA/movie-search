export const yandexTranslate = async (word: string): Promise<string> => {
  const url = `${'https://translate.yandex.net/api/v1.5/tr.json/translate?key='
  + 'trnsl.1.1.20200424T162457Z.6bdc9792bcee8e6e.b8a776b7e991945b8205fe900b176cafd6572e36&text='}${
    word
  }&lang=en`;
  try {
    const data = await fetch(url);
    const result = await data.json();
    return result.text[0].toLowerCase();
  } catch (e) {
    return e;
  }
};
