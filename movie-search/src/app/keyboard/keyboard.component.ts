import { $, Component } from '../../main';

@Component({
  selector: '#app-keyboard',
  template: require('./keyboard.component.html'),
  events: {
    'click #keyboard': 'keyboardHandler'
  }
})
export class AppKeyboard {
  $formInput = $('#form-input');

  onInit() {
    this.$formInput.focus();
  }

  keyboardHandler(e) {
    let start = this.$formInput.selStart();
    let end = this.$formInput.selEnd();
    const $keyboard = $(e.currentTarget);
    const $target = $(e.target);
    const value = $target.val();

    if ($target.hasClass('switch')) {
      $keyboard.switchClass('en')
    }

    if ($target.hasClass('symbol')) {
      this.$formInput.setRangeText(value, start, end, 'end').focus();
    }

    if ($target.hasName('Backspace')) {
      if (start > 0 && start === end) {
        start--;
      }
      this.$formInput.setRangeText('', start, end, 'end').focus();
    }

    if ($target.hasName('Delete')) {
      if (start < this.$formInput.val().length && start === end) {
        end++;
      }
      this.$formInput.setRangeText('', start, end, 'end').focus();
    }

    if ($target.hasName('ArrowLeft')) {
      if (start > 0 && start === end) {
        this.$formInput.nativeElement.selectionEnd = --start;
      }

      if (start > 0 && start !== end) {
        this.$formInput.nativeElement.selectionEnd = start;
      }

      this.$formInput.focus();
    }

    if ($target.hasName('ArrowRight')) {
      if (start < this.$formInput.val().length && start === end) {
        this.$formInput.nativeElement.selectionStart = ++end;
      }

      if (start < this.$formInput.val().length && start !== end) {
        this.$formInput.nativeElement.selectionStart = end;
      }

      this.$formInput.focus();
    }

    if ($target.hasName('Enter')) {
      $('#search-form').trigger('submit');
      $keyboard.parent().addClass('hide');
    }
  }
}
