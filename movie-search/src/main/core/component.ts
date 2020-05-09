export interface IComponent {
  readonly template: string;
  readonly selector: string;
  readonly title?: string;
  onInit?: () => void;
  render?: () => void;
}

export class MainComponent implements IComponent{

  template: string;
  selector: string;
  title: string;
  el: HTMLElement;

  constructor(config: IComponent) {
    this.template = config.template;
    this.selector = config.selector;
    this.title = config.title;
    this.el = null;
  }

  render(): void {
    this.el = document.querySelector(this.selector);

    if (!this.el) {
      throw new Error(`Component with selector ${this.selector} not found`);
    }

    this.el.innerHTML = this.template;

    if (this.title) {
      document.title = this.title;
    }
  }
}