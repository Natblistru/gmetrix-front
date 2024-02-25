import { FETCH_EVALUATIONS_ALL } from './actions';

const initialState = JSON.parse(localStorage.getItem('evaluations_all')) || [];

const evaluationAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVALUATIONS_ALL:
      localStorage.setItem('evaluations_all', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default evaluationAllReducer;
