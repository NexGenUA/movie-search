import { $, Component, yandexTranslate } from '../../main';

@Component({
  selector: '#app-search-form',
  template: require('./search-form.component.html'),
  events: {
    'submit #search-form': 'getMovies',
  }
})
export class AppSearchForm {
  ombKey = '14e5c753';

  async getMovies(e) {
    e.preventDefault();
    const $input = $('#form-input');
    const value = $input.val().trim();

    if (!value) {
      return;
    }

    $input.clear();
    const translate = await yandexTranslate(value);
    console.log(typeof translate, translate);
  }
}
