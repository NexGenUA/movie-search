import { OMDB_KEY } from '../../common/config';


export const ombd = async (searchPhrase: string): Promise<any> => {
  const queryString = searchPhrase.split(' ').join('+');
  const url = `https://www.omdbapi.com/?s=${queryString}&apikey=${OMDB_KEY}`;
  const result = [];

  try {
    const data = await fetch(url);
    const response = await data.json();

    if (response.Error === 'Request limit reached!') {
      return 401;
    }

    if (response.Error === 'Invalid API key!') {
      return 403;
    }

    if (response.Response === 'True') {
      const resultsCount = parseInt(response.totalResults, 10);
      const count = Math.ceil(resultsCount / 10);

      response.Search.forEach((movie, i) => {
        result[i] = fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${OMDB_KEY}`).then(
          res => {
            if (res.status != 200) {
              return null;
            } else {
              return res.json();
            }
          },
          () => {
            return null;
          }
        );
      });

      const fetchData = await Promise.all(result);
      const results = fetchData.map(movie => {
        if (movie) {
          return {
            title: movie.Title,
            year: movie.Year,
            time: movie.Runtime,
            rating: movie.imdbRating,
            img: movie.Poster,
            id: movie.imdbID,
          }
        }
      });

      return {
        slides: results.filter(data => !!data),
        count,
        queryString,
      };
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
