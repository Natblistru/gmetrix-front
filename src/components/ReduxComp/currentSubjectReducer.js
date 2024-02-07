import { UPDATE_CURRENT_SUBJECT } from './actions';

const initialState = {
  currentSubject: JSON.parse(localStorage.getItem('currentSubject')) || null
};

const currentSubjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_SUBJECT:
      const newState = {
        ...state,
        currentSubject: action.payload
      };
      localStorage.setItem('currentSubject', JSON.stringify(newState.currentSubject));
      return newState;
    default:
      return state;
  }
};

export default currentSubjectReducer;
