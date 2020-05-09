import { $, Component, IComponent, yandexTranslate } from '../../main';

class AppSearchForm extends Component {
  ombKey: string;

  constructor(config: IComponent) {
    super(config);
    this.events = () => ({
      'submit #search-form': 'getMovies',
    });
    this.ombKey = '14e5c753';
  }

  async getMovies(e) {
    e.preventDefault();
    const $input = $('#form-input');
    const value = $input.val().trim();
    if (!value) return;
    $input.clear();
    const translate = await yandexTranslate(value);
    console.log(typeof translate, translate);
  }
}

export const appSearchForm = new AppSearchForm({
  selector: '#app-search-form',
  template: require('./search-form.component.html')
});
