import { ADD_RASPUNS, UPDATE_RASPUNS, DELETE_RASPUNS } from './actions';

const initialState = {
  items: []
};

const raspunsuriReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RASPUNS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case UPDATE_RASPUNS:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case DELETE_RASPUNS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

export default raspunsuriReducer;
