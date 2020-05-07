import { Component, IComponent } from '../main';

class AppComponent extends Component {
  constructor(config: IComponent) {
    super(config)
  }
}

export const appComponent: IComponent = new AppComponent({
  selector: 'app-root',
  template: require('./app.component.html'),
  title: 'Movie Search'
});