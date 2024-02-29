import { FETCH_ALL_TEACHER_TESTS } from './actions';

const initialState = JSON.parse(localStorage.getItem('allTeacherTests')) || [];

const allTeacherTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TEACHER_TESTS:
      localStorage.setItem('allTeacherTests', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default allTeacherTestsReducer;
