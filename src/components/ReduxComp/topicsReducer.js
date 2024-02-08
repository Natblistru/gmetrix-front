// topicsReducer.js
import { FETCH_TOPICS } from './actions';

const initialState = JSON.parse(localStorage.getItem('topics')) || [];

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS:
      localStorage.setItem('topics', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default topicsReducer;
