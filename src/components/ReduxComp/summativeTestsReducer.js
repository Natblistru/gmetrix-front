import { FETCH_SUMMATIVE_TESTS } from './actions';

const initialState = JSON.parse(localStorage.getItem('summativeTests')) || [];

const summativeTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUMMATIVE_TESTS:
      localStorage.setItem('summativeTests', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default summativeTestsReducer;
