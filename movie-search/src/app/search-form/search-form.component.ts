import { $, cardsMaker, Component, dataEx, ombd, yandexTranslateService } from '../../main';

@Component({
  selector: '#app-search-form',
  template: require('./search-form.component.html'),
  events: {
    'submit #search-form': 'getMovies',
  }
})
export class AppSearchForm {

  async getMovies(e) {
    e.preventDefault();
    const $input = $('#form-input');
    const value = $input.val().trim();

    if (!value) {
      return;
    }

    const translate = await yandexTranslateService(value);
    const response = await ombd(translate);
    if (!response) {
      console.log('no results');
      return;
    }
    const slides = response.slides.map(s => cardsMaker(s));
    dataEx.send(slides, response.count, response.queryString);
  }
}
