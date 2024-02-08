import { FETCH_CURRENT_TESTS } from './actions';

const initialState = JSON.parse(localStorage.getItem('currentTests')) || [];

const currentTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_TESTS:
      localStorage.setItem('currentTests', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default currentTestsReducer;
