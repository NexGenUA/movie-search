import { IComponent } from './component';

export class MainModule {
  components: IComponent[];

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

  renderComponent(C): void {
    const component = new C();

    if (component.onInit) {
      component.onInit();
    }
  }
}
