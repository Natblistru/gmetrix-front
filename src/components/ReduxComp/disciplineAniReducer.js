// reducer.js
import { FETCH_DISCIPLINE } from './actions';

const initialState = JSON.parse(localStorage.getItem('disciplineAni')) || [];

const disciplineAniReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCIPLINE:
      const newState = action.payload;
      localStorage.setItem('disciplineAni', JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

export default disciplineAniReducer;
