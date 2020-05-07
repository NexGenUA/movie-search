import { Component, IComponent } from "../../main";

class AppHeader extends Component {
  constructor(config: IComponent) {
    super(config)
  }
}

export const appHeader = new AppHeader({
  selector: '#app-header',
  template: require('./header.component.html')
});
