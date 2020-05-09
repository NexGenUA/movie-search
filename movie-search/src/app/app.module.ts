import { MainModule } from "../main/";
import { appComponent } from "./app.component";
import { AppHeader } from "./header/header.component";
import { AppSearchForm } from "./search-form/search-form.component";
import { AppCards } from "./cards/cards.component";
import { AppFooter } from './footer/footer.component';

class AppModule extends MainModule {
  constructor(config) {
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    AppHeader,
    AppSearchForm,
    AppCards,
    AppFooter
  ],
  main: appComponent,
});

