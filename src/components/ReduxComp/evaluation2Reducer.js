import { FETCH_EVALUATIONS_2 } from './actions';

const initialState = JSON.parse(localStorage.getItem('evaluations2')) || [];

const evaluation2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVALUATIONS_2:
      localStorage.setItem('evaluations2', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default evaluation2Reducer;
