import { setCORS } from "google-translate-api-browser";

const translate = setCORS("http://cors-anywhere.herokuapp.com/");

export const translateService = (word: string) => translate(word, { to: "en" });
