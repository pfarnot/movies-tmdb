// redux/reducers/movieReducer.js

const initialState = {
    popularMovies: [],
    // Otros estados iniciales
  };
  
  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_POPULAR_MOVIES':
        return {
          ...state,
          popularMovies: action.payload,
        };
      // Otros casos de acción y actualizaciones de estado
      default:
        return state;
    }
  };
  
  export default movieReducer;
  