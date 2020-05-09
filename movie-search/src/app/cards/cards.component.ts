import { $, Component } from '../../main';
import Swiper from 'swiper';
import * as mock from '../../mock/mock.data.json'

@Component({
  selector: '#app-cards',
  template: require('./cards.component.html')
})
export class AppCards {

  onInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1020: {
          slidesPerView: 4
        },
        840: {
          slidesPerView: 3
        },
        580: {
          slidesPerView: 2
        }
      }
    });
    $('#slider').html(`<div class="swiper-slide">
      <div class="wrap-title-movie">
        <span class="title-movie">Dolittle</span>
      </div>
      <img data-src="assets/dolittle.jpg" src="#" alt="Dolittle" class="swiper-lazy slider-img">
      <div class="swiper-lazy-preloader"></div>
      <span class="year">2020</span>
      <span class="runtime">101 min</span>
      <div class="wrap-rating">
        <span class="material-icons star">star</span>
        <span class="rating">5.6</span>
      </div>
    </div>`);
    setTimeout(() => {
      swiper[1].update();
      swiper[1].slideReset();
      swiper[1].lazy.load();
      console.log('updated')
    }, 5000);
  }
}
