import { FETCH_EVALUATIONS } from './actions';

const initialState = JSON.parse(localStorage.getItem('evaluations')) || [];

const evaluationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVALUATIONS:
      localStorage.setItem('evaluations', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default evaluationReducer;
