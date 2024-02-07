import { FETCH_EVALUATIONS_3 } from './actions';

const initialState = JSON.parse(localStorage.getItem('evaluations3')) || [];

const evaluation3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVALUATIONS_3:
      localStorage.setItem('evaluations3', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default evaluation3Reducer;
