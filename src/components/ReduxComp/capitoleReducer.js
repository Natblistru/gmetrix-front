import { FETCH_CAPITOLE } from './actions';

const initialState = JSON.parse(localStorage.getItem('capitole')) || [];

const capitoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAPITOLE:
      localStorage.setItem('capitole', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default capitoleReducer;
