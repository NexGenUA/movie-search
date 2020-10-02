interface IConfig {
  selector: string;
  template: string;
  events?: { [property: string]: string };
}

export function Component(config: IConfig) {
  return function <T extends { new(...args: any[]): object }>(Constructor: T) {
    return class extends Constructor {
      constructor(...props: any[]) {
        super(...props);

        const node = document.querySelector(config.selector);
        node.innerHTML = config.template;

        if (config.events) {
          const { events } = config;

          for (const event in events) {
            const selectorEvent = event.split(' ');
            const el = node.querySelector(selectorEvent[1]);
            el.addEventListener(selectorEvent[0], this[events[event]].bind(this));
          }
        }
      }
    };
  };
}
