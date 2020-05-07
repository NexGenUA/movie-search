import { IComponent } from './component';

export class MainModule {

  components: [];
  mainComponent: IComponent;

  constructor(config) {
    this.components = config.components;
    this.mainComponent = config.main;
  }

  start(): void {
    this.init();
  }

  init(): void {
    this.mainComponent.render();
    this.components.forEach(this.renderComponent);
  }

  renderComponent(c: IComponent): void {
    c.render();
    if (!!c.onInit) c.onInit();
  }

}
