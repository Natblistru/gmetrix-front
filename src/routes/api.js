import axios from "axios";

export const fetchTheme = async (teacherVideo, theme, subject_id, level_id, dispatchData) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/teachertheme?level=${level_id}&disciplina=${subject_id}&teacher=${teacherVideo}&student=1&theme=${theme}`);

        dispatchData({
            type: "FETCH_TOPICS",
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};
