export interface IComponent {
  readonly template: string;
  readonly selector: string;
  readonly title?: string;
  onInit?: () => void;
  render?: () => void;
}

export class Component implements IComponent{

  template: string;
  selector: string;
  title: string;
  el: HTMLElement;
  events: () => object;

  constructor(config: IComponent) {
    this.template = config.template;
    this.selector = config.selector;
    this.title = config.title;
    this.el = null;
  }

  render(): void {
    this.el = document.querySelector(this.selector);
    if (!this.el) throw new Error(`Component with selector ${this.selector} not fount`);
    this.el.innerHTML = this.template;
    if (this.title) {
      document.title = this.title;
    }
    this.initEvents();
  }

  initEvents(): void {
    if (!this.events) return;

    const events = this.events();

    for (const event in events) {
      const selectorEvent = event.split(' ');
      const el = this.el.querySelector(selectorEvent[1]);
      el.addEventListener(selectorEvent[0], this[events[event]])
    }
  }
}