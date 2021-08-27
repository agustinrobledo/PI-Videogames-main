const initialState = {
  loading: false,
  games: [],
  error: '',
  loadingGenres: false,
  genres: [],
  errorGenres: '',

};

// 
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_GAMES_SUCCESS':
      return {
        ...state,
        loading: true,
        games: action.payload,
        error: '',
      };
    case 'LIST_GAMES_FAILURE':
      return {
        ...state,
        loading: false,
        games: [],
        error: action.payload,
      };
    case 'FETCH_LIST_GAMES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_GENRE_LIST_REQUEST':
      return {
        ...state,
        loadingGenres: true,
      };
    case 'GENRE_LIST_SUCCESS':
      return {
        ...state,
        loadingGenres: true,
        genres: action.payload,
        errorGenres: '',
      };
    case 'GENRE_LIST_FAILURE':
      return {
        ...state,
        loadingGenres: false,
        genres: [],
        errorGenres: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;