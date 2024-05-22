import axios from "axios";
import { FETCH_CAPITOLE,
         FETCH_TOPICS,
         FETCH_EVALUATIONS_1, 
         FETCH_EVALUATIONS_2, 
         FETCH_EVALUATIONS_3,
         FETCH_EVALUATIONS_ALL,
         FETCH_ALL_TEACHER_TESTS } from '../components/ReduxComp/actions';

export const fetchCapitole = async (subject_id, level_id, dispatchData, student_id = 1) => {
    try {
        const res = await axios.get(`/api/capitoleDisciplina?level=${level_id}&disciplina=${subject_id}&student=${student_id}`);

        // console.log(res.data);
        dispatchData({
            type: FETCH_CAPITOLE,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const fetchTheme = async (teacherVideo, theme, subject_id, level_id, dispatchData, student_id = 1) => {
    try {
        const res = await axios.get(`/api/teachertheme?level=${level_id}&disciplina=${subject_id}&teacher=${teacherVideo}&student=${student_id}&theme=${theme}`);

        dispatchData({
            type: FETCH_TOPICS,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};

export const fetchEvaluation1 = async (theme, subject_id, level_id, dispatchData) => {
    try {
        const res = await axios.get(`/api/themeevaluation1?level=${level_id}&disciplina=${subject_id}&theme=${theme}`);
        dispatchData({
            type: FETCH_EVALUATIONS_1,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};
  
export const fetchEvaluation2 = async (theme, subject_id, level_id, dispatchData) => {
    try {
//   console.log(theme)
//   console.log(subject_id)
//   console.log(level_id)  
        const res = await axios.get(`/api/themeevaluation2?level=${level_id}&disciplina=${subject_id}&theme=${theme}`);
  
        dispatchData({
            type: FETCH_EVALUATIONS_2,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
  }
  
export const fetchEvaluation3 = async (theme, subject_id, level_id, dispatchData) => {
    try {
  
        const res = await axios.get(`/api/themeevaluation3?level=${level_id}&disciplina=${subject_id}&theme=${theme}`);
        dispatchData({
            type: FETCH_EVALUATIONS_3,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
  }

export const fetchEvaluation_all = async (theme, subject_id, level_id, dispatchData) => {
    try {
        const res = await axios.get(`/api/themeEvaluation_all?level=${level_id}&disciplina=${subject_id}&theme=${theme}`);
        // console.log(res.data)
        dispatchData({
            type: FETCH_EVALUATIONS_ALL,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};

export const fetchAllTeacherTestsSuccess = async (teacher_topic_id, currentStudent, dispatchData) => {
    try {
        const res = await axios.get(`/api/teacherAllTests?teacher_topic=${teacher_topic_id}&student=${currentStudent}`);
        // console.log(res.data);
        dispatchData({
            type: FETCH_ALL_TEACHER_TESTS,
            payload: res.data
        });
      } catch (err) {
          console.error(err);
      }
};
