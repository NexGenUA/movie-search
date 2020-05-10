import { $, cardsMaker, Component, dataEx, ombd } from '../../main';
import Swiper from 'swiper';

@Component({
  selector: '#app-cards',
  template: require('./cards.component.html')
})
export class AppCards {
  swiper: any;
  currentPage = 1;
  pagesCount: number;
  searchPhrase: string;

  dataChanged(data) {
    this.swiper.removeAllSlides();
    this.swiper.appendSlide(data[0]);
    this.swiper.lazy.load();

    document.querySelectorAll('#slider img').forEach((el: HTMLImageElement) => {
      const setDefaultPosterImage = () => {
        el.src = 'assets/default_poster.png';
      };
      el.addEventListener('error', setDefaultPosterImage);
    });

    this.currentPage = 1;
    this.pagesCount = parseInt(data[1], 10);
    this.searchPhrase = data[2];
  }

  onInit() {
    dataEx.subscribe(this);

    this.swiper = new Swiper('.swiper-container', {
      centeredSlides: false,
      updateOnImagesReady: true,
      freeMode: true,
      freeModeSticky: true,
      slidesPerView: 1,
      spaceBetween: 20,
      preventClicks: false,
      preventClicksPropagation: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        dynamicBullets: true,
        dynamicMainBullets: 7,
      },
      preloadImages: true,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 5
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1020: {
          slidesPerView: 4
        },
        875: {
          slidesPerView: 3
        },
        580: {
          slidesPerView: 2
        }
      },
      centerInsufficientSlides: true
    });

    this.swiper.on('reachEnd', () => {
      if (this.currentPage < this.pagesCount) {
        $('#preloader').addClass('on');

        this.currentPage += 1;

        const nextPageQueryString = `${this.searchPhrase}&page=${this.currentPage}`;
        const getNextPage = ombd(nextPageQueryString);

        getNextPage.then(res => {
          $('#preloader').removeClass('on');
          const slides = res.slides.map(s => cardsMaker(s));
          this.swiper.appendSlide(slides);
        });
      }
    });

    this.swiper.on('click', (e) => {
      const $target = $(e.target);
      if ($target.hasClass('title-movie')) {
        const id = $target.attr('data-id');
        window.location.href = `https://www.imdb.com/title/${id}/videogallery/`
      }
    });
  }
}
