import axios from "axios";
import { FETCH_CAPITOLE,
         FETCH_TOPICS,
         FETCH_EVALUATIONS_1, 
         FETCH_EVALUATIONS_2, 
         FETCH_EVALUATIONS_3 } from '../components/ReduxComp/actions';

export const fetchCapitole = async (subject_id, level_id, dispatchData, student_id = 1) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/capitoleDisciplina?level=${level_id}&disciplina=${subject_id}&student=${student_id}`);

        console.log(res.data);
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
        const res = await axios.get(`http://localhost:8000/api/teachertheme?level=${level_id}&disciplina=${subject_id}&teacher=${teacherVideo}&student=${student_id}&theme=${theme}`);

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
        const res = await axios.get(`http://localhost:8000/api/themeevaluation1?level=${level_id}&disciplina=${subject_id}&theme=${theme}`);
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
  
        const res = await axios.get(`http://localhost:8000/api/themeevaluation2?level=${level_id}&disciplina=${subject_id}&theme=${theme}`);
  
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
  
        const res = await axios.get(`http://localhost:8000/api/themeevaluation3?level=${level_id}&disciplina=${subject_id}&theme=${theme}`);
        dispatchData({
            type: FETCH_EVALUATIONS_3,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
  }
