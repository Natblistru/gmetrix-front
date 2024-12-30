import { FETCH_ALL_TEACHER_TESTS, UPDATE_STUDENT_PROCENT } from './actions';

const initialState = JSON.parse(localStorage.getItem('allTeacherTests')) || [];

const allTeacherTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TEACHER_TESTS:
      localStorage.setItem('allTeacherTests', JSON.stringify(action.payload));
      return action.payload;

    case UPDATE_STUDENT_PROCENT:
      const { index, newProcent } = action.payload;

      const updatedTests = [...state];
      updatedTests[index] = {
        ...updatedTests[index],
        student_procent: newProcent,
      };

      localStorage.setItem('allTeacherTests', JSON.stringify(updatedTests));

      return updatedTests;

    default:
      return state;
  }
};

export default allTeacherTestsReducer;