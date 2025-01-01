export const ADD_BREADCRUMB = 'ADD_BREADCRUMB';
export const UPDATE_SUBJECT_BREADCRUMB = 'UPDATE_SUBJECT_BREADCRUMB';
export const UPDATE_TOPIC_BREADCRUMB = 'UPDATE_TOPIC_BREADCRUMB';
export const UPDATE_SUBTOPIC_BREADCRUMB = 'UPDATE_SUBTOPIC_BREADCRUMB';
export const FETCH_DISCIPLINE = 'FETCH_DISCIPLINE';
export const FETCH_SUBTITLE_TEACHERS = 'FETCH_SUBTITLE_TEACHERS';
export const FETCH_CAPITOLE = 'FETCH_CAPITOLE';
export const UPDATE_CURRENT_THEME = 'UPDATE_CURRENT_THEME';
export const FETCH_THEME_VIDEO = 'FETCH_THEME_VIDEO';
export const FETCH_THEME_VIDEO_SUCCESS = 'FETCH_THEME_VIDEO_SUCCESS';
export const FETCH_THEME_VIDEO_FAILURE = 'FETCH_THEME_VIDEO_FAILURE';
export const FETCH_THEME_PRESENTATION_SUCCESS = 'FETCH_THEME_PRESENTATION_SUCCESS';
export const FETCH_THEME_PRESENTATION_FAILURE = 'FETCH_THEME_PRESENTATION_FAILURE';
export const FETCH_EVALUATIONS = 'FETCH_EVALUATIONS';
export const FETCH_EVALUATIONS_1 = 'FETCH_EVALUATIONS_1';
export const FETCH_EVALUATIONS_2 = 'FETCH_EVALUATIONS_2';
export const FETCH_EVALUATIONS_3 = 'FETCH_EVALUATIONS_3';
export const FETCH_EVALUATIONS_ALL = 'FETCH_EVALUATIONS_ALL';
export const FETCH_SUMMATIVE_TESTS = 'FETCH_SUMMATIVE_TESTS';
export const UPDATE_CURRENT_SUBJECT = 'UPDATE_CURRENT_SUBJECT';
export const FETCH_TOPICS = 'FETCH_TOPICS';
export const UPDATE_CURRENT_TOPIC = 'UPDATE_CURRENT_TOPIC';
export const FETCH_CURRENT_TESTS = 'FETCH_CURRENT_TESTS';
export const FETCH_ALL_TEACHER_TESTS = 'FETCH_ALL_TEACHER_TESTS';
export const FETCH_CURRENT_INDEX_TEST = 'FETCH_CURRENT_INDEX_TEST';
export const UPDATE_CURRENT_STUDENT = 'UPDATE_CURRENT_STUDENT';
export const ADD_RASPUNS = 'ADD_RASPUNS';
export const UPDATE_RASPUNS = 'UPDATE_RASPUNS';
export const DELETE_RASPUNS = 'DELETE_RASPUNS';
export const UPDATE_STUDENT_PROCENT = 'UPDATE_STUDENT_PROCENT';
export const UPDATE_STUDENT_ANSWER = 'UPDATE_STUDENT_ANSWER';
export const RESET_STUDENT_OPTIONS = 'RESET_STUDENT_OPTIONS';

export const addBreadcrumb = (breadcrumb) => ({
  type: ADD_BREADCRUMB,
  payload: breadcrumb
});

export const updateSubjectBreadcrumb = (breadcrumb) => ({
  type: UPDATE_SUBJECT_BREADCRUMB,
  payload: breadcrumb
});

export const updateTopicBreadcrumb = (breadcrumb) => ({
  type: UPDATE_TOPIC_BREADCRUMB,
  payload: breadcrumb
});

export const updateSubTopicBreadcrumb = (breadcrumb) => ({
  type: UPDATE_SUBTOPIC_BREADCRUMB,
  payload: breadcrumb
});

export const fetchDiscipline = (disciplineAni) => ({
  type: FETCH_DISCIPLINE,
  payload: disciplineAni
});

export const fetchSubtitleTeachers = (teachers) => ({
  type: FETCH_SUBTITLE_TEACHERS,
  payload: teachers
});

export const fetchCapitoleRedux = (capitole) => ({
  type: FETCH_CAPITOLE,
  payload: capitole
});

export const updateCurrentTheme = (theme) => ({
  type: UPDATE_CURRENT_THEME,
  payload: theme
});

export const fetchThemeVideoSuccess = (videoData) => ({
  type: FETCH_THEME_VIDEO_SUCCESS,
  payload: videoData
});
export const fetchThemeVideoFailure = () => ({
  type: FETCH_THEME_VIDEO_FAILURE
});

export const fetchThemePresentationSuccess = (presentationData) => ({
  type: FETCH_THEME_PRESENTATION_SUCCESS,
  payload: presentationData
});
export const fetchThemePresentationFailure = () => ({
  type: FETCH_THEME_PRESENTATION_FAILURE
});

export const fetchEvaluationsSuccess = (evaluations) => ({
  type: FETCH_EVALUATIONS,
  payload: evaluations
});

export const updateCurrentSubject = (subject) => ({
  type: UPDATE_CURRENT_SUBJECT,
  payload: subject
});

export const fetchTopicsSuccess = (topics) => ({
  type: FETCH_TOPICS,
  payload: topics
});

export const updateCurrentTopic = (topic) => ({
  type: UPDATE_CURRENT_TOPIC,
  payload: topic
});

export const fetchCurrentTestsSuccess = (tests) => ({
  type: FETCH_CURRENT_TESTS,
  payload: tests
});

export const fetchAllTeacherTestsSuccess = (alltests) => ({
  type: FETCH_ALL_TEACHER_TESTS,
  payload: alltests
});

export const fetchCurrentIndexTest = (index) => ({
  type: FETCH_CURRENT_INDEX_TEST,
  payload: index
});

export const updateCurrentStudent = (studentId) => ({
  type: UPDATE_CURRENT_STUDENT,
  payload: studentId
});


export const addRaspuns = (raspuns) => ({
  type: ADD_RASPUNS,
  payload: raspuns
});

export const updateRaspuns = (raspuns) => ({
  type: UPDATE_RASPUNS,
  payload: raspuns
});

export const deleteRaspuns = (id) => ({
  type: DELETE_RASPUNS,
  payload: id
});

export const updateStudentProcent = (index, newProcent) => ({
  type: UPDATE_STUDENT_PROCENT,
  payload: { index, newProcent },
});

export const updateStudentAnswer = (index, newAnswer) => ({
  type: UPDATE_STUDENT_ANSWER,
  payload: { index, newAnswer },
});

export const resetStudentOptions = () => ({
  type: RESET_STUDENT_OPTIONS,
});
