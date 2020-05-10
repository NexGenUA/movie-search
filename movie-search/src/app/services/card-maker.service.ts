export const cardsMaker = (movie: any): string => {
  let imageUrl = movie.img;
  if (!movie.img || movie.img === 'N/A') {
    imageUrl = 'assets/default_poster.png';
  }
  return `<div class="swiper-slide">
    <div class="wrap-title-movie">
      <span data-id="${movie.id}" class="title-movie">${movie.title}</span>
    </div>
    <img data-src="${imageUrl}" src="#" alt="${movie.title}" class="swiper-lazy slider-img">
    <div class="swiper-lazy-preloader"></div>
    <span class="year">${movie.year}</span>
    <span class="runtime">${movie.time}</span>
    <div class="wrap-rating">
      <span class="material-icons star">star</span>
      <span class="rating">${movie.rating}</span>
    </div>
  </div>
  `
};
