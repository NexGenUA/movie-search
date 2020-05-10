import { $, cardsMaker, Component, dataEx, ombd, yandexTranslateService } from '../../main';

@Component({
  selector: '#app-search-form',
  template: require('./search-form.component.html'),
  events: {
    'submit #search-form': 'getMovies',
    'click #keyboard-button': 'showHideKeyboard',
    'click #clear-input': 'clearInput',
    'click #speak': 'startSpeechRecognition'
  }
})
export class AppSearchForm {
  recognition: SpeechRecognition;
  recordTimer: any;
  RECORD_TIMER: number = 10000;

  async getMovies(e) {
    e.preventDefault();
    const $input = $('#form-input');
    const value = $input.val().trim();
    const $queryInfo = $('#query-info');
    const $preloader = $('#preloader');
    $queryInfo.removeClass('error');

    $preloader.addClass('on');

    if (!value) {
      $preloader.removeClass('on');
      return;
    }

    const translate = await yandexTranslateService(value);
    const response = await ombd(translate);

    $preloader.removeClass('on');

    if (response === 401) {
      $queryInfo.addClass('error');
      $queryInfo.html(`
        Invalid API key!
      `);
      return
    }

    if (response === 403) {
      $queryInfo.addClass('error');
      $queryInfo.html(`
        Request limit reached!
      `);
      return
    }

    if (!response) {
      $queryInfo.addClass('error');

      $queryInfo.html(`
        No results for "${value}"
      `);

      return;
    }

    $queryInfo.html(`
      Shown results for "${value}"
    `);

    $input.val('');

    const slides = response.slides.map(s => cardsMaker(s));
    dataEx.send(slides, response.count, response.queryString);
  }

  showHideKeyboard() {
    $('#app-keyboard').switchClass('hide');
  }

  clearInput() {
    $('#form-input').clear();
  }

  startSpeechRecognition() {
    const $preloader = $('#preloader');

    const $speak = $('#speak');
    $speak.addClass('active');

    window.SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = true;

    let res;

    this.recognition.addEventListener('result', e => {
      const result = e.results[0];
      if (result.isFinal) {
        res = result[0].transcript;
      }
    });

    this.recognition.addEventListener('speechstart', () => {
      $preloader.addClass('on');

      this.recordTimer = setTimeout(() => {
        $preloader.removeClass('on');

        clearTimeout(this.recordTimer);

        this.recordTimer = null;
      }, this.RECORD_TIMER);
    });

    this.recognition.addEventListener('end', () => {
      $('#form-input').val(res);
      $('#search-form').trigger('submit');
      $speak.removeClass('active');

      if (this.recordTimer) {
        clearTimeout(this.recordTimer);
        this.recordTimer = null;
      }

    });

    this.recognition.start();
  }
}
