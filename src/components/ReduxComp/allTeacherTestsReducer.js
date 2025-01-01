import { FETCH_ALL_TEACHER_TESTS, UPDATE_STUDENT_PROCENT, UPDATE_STUDENT_ANSWER, RESET_STUDENT_OPTIONS } from './actions';

const initialState = JSON.parse(localStorage.getItem('allTeacherTests')) || [];

const allTeacherTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TEACHER_TESTS:
      localStorage.setItem('allTeacherTests', JSON.stringify(action.payload));
      return action.payload;

    case UPDATE_STUDENT_PROCENT:
      const { index: procentIndex, newProcent } = action.payload;

      const updatedProcentTests = [...state];
      updatedProcentTests[procentIndex] = {
        ...updatedProcentTests[procentIndex],
        student_procent: newProcent,
      };

      localStorage.setItem('allTeacherTests', JSON.stringify(updatedProcentTests));
      return updatedProcentTests;

    case UPDATE_STUDENT_ANSWER:
      const { index: answerIndex, newAnswer } = action.payload;

      const updatedAnswerTests = [...state];
      updatedAnswerTests[answerIndex] = {
        ...updatedAnswerTests[answerIndex],
        student_options: newAnswer,
      };

      localStorage.setItem('allTeacherTests', JSON.stringify(updatedAnswerTests));
      return updatedAnswerTests;

    case RESET_STUDENT_OPTIONS:
      const resetTests = state.map(item => {
        const { student_options, ...rest } = item; // Elimină proprietatea student_options
        return {
          ...rest,
          student_procent: "0.000000", // Resetează student_procent
        };
      });
      localStorage.setItem('allTeacherTests', JSON.stringify(resetTests));
      return resetTests;

    default:
      return state;
  }
};

export default allTeacherTestsReducer;