import { MainComponent, IComponent } from '../main';

class AppComponent extends MainComponent {
}

export const appComponent: IComponent = new AppComponent({
  selector: 'app-root',
  template: require('./app.component.html'),
  title: 'Movie Search',
});
