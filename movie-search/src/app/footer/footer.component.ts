import { Component, IComponent } from '../../main';

class AppFooter extends Component {
  constructor(config: IComponent) {
    super(config)
  }
}

export const appFooter = new AppFooter({
  selector: '#app-footer',
  template: require('./footer.component.html')
});
