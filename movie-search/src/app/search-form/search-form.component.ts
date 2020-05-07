import { Component, IComponent } from "../../main";

class AppSearchForm extends Component {
  constructor(config: IComponent) {
    super(config)
  }
}

export const appSearchForm = new AppSearchForm({
  selector: '#app-search-form',
  template: require('./search-form.component.html')
});
