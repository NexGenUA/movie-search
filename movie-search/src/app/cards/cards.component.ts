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
    console.log(this.pagesCount, this.searchPhrase);
  }

  onInit() {
    dataEx.subscribe(this);

    this.swiper = new Swiper('.swiper-container', {
      centeredSlides: false,
      freeMode: true,
      freeModeSticky: true,
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        dynamicBullets: true,
        dynamicMainBullets: 10,
      },
      preloadImages: true,
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

    this.swiper.lazy.load();
    this.swiper.on('reachEnd', () => {
      console.log('end', this.pagesCount);
      if (this.currentPage < this.pagesCount) {
        this.currentPage += 1;
        const nextPageQueryString = `${this.searchPhrase}&page=${this.currentPage}`;
        const getNextPage = ombd(nextPageQueryString);
        getNextPage.then(res => {
          const slides = res.slides.map(s => cardsMaker(s));
          this.swiper.appendSlide(slides);
        });
        console.log('next page ', getNextPage)
      }
      console.log('test')
    });
    // $('#slider').html(``);
    // setTimeout(() => {
    //   swiper.update();
    //   swiper.slideReset();
    //   swiper.lazy.load();
    //   console.log('updated')
    // }, 5000);
  }
}
