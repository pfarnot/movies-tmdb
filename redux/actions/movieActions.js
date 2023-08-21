// redux/actions/movieActions.js

import axios from 'axios';

// Acción para obtener las películas populares
export const getPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          api_key: 'YOUR_API_KEY',
        },
      }
    );

    dispatch({
      type: 'GET_POPULAR_MOVIES',
      payload: response.data.results,
    });
  } catch (error) {
    console.error(error);
  }
};

// Otras acciones relacionadas con las películas
