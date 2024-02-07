import { FETCH_EVALUATIONS_1 } from './actions';

const initialState = JSON.parse(localStorage.getItem('evaluations1')) || [];

const evaluation1Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVALUATIONS_1:
      localStorage.setItem('evaluations1', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default evaluation1Reducer;
