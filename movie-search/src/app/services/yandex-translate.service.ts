import { YANDEX_KEY } from '../../common/config';

export const yandexTranslateService = async (word: string): Promise<string> => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}&text=${word}&lang=en`;
  try {
    const data = await fetch(url);
    const result = await data.json();
    return result.text[0].toLowerCase();
  } catch (e) {
    return e;
  }
};
