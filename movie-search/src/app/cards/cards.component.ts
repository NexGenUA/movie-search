import { $$, Component, IComponent } from '../../main';
import Swiper from 'swiper';

class AppCards extends Component {
  constructor(config: IComponent) {
    super(config);
  }

  onInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

export const appCards = new AppCards({
  selector: '#app-cards',
  template: require('./cards.component.html')
});
