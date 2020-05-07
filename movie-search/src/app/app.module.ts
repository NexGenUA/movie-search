import { MainModule } from "../main/";
import { appComponent } from "./app.component";
import { appHeader } from "./header/header.component";
import { appSearchForm } from "./search-form/search-form.component";
import { appCards } from "./cards/cards.component";
import { appFooter } from './footer/footer.component';

class AppModule extends MainModule {
  constructor(config) {
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    appHeader,
    appSearchForm,
    appCards,
    appFooter
  ],
  main: appComponent,
});

