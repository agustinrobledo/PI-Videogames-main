const initialState = {
  ListOfGames: [],
  GameDetail: {},
};

// 
const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GAME':
      return {
        ...state,
        ListOfGames: [
          ...state.ListOfGames,
          action.payload,
        ],
      };
    case 'GET_GAME_DETAIL':
      return {
        ...state,
        GameDetail: action.payload,
      };
    default:
      return state;
  }
}

export default todos;