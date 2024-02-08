import { UPDATE_CURRENT_STUDENT } from './actions';

const initialState = {
  currentStudent: localStorage.getItem('currentStudent') || 1
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_STUDENT:
      localStorage.setItem('currentStudent', action.payload);
      return {
        ...state,
        currentStudent: action.payload
      };
    default:
      return state;
  }
};

export default studentReducer;
