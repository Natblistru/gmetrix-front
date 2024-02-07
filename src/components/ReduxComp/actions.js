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
export const FETCH_EVALUATIONS = 'FETCH_EVALUATIONS';
export const FETCH_EVALUATIONS_1 = 'FETCH_EVALUATIONS_1';
export const FETCH_EVALUATIONS_2 = 'FETCH_EVALUATIONS_2';
export const FETCH_EVALUATIONS_3 = 'FETCH_EVALUATIONS_3';
export const UPDATE_CURRENT_SUBJECT = 'UPDATE_CURRENT_SUBJECT';

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

export const fetchEvaluationsSuccess = (evaluations) => ({
  type: FETCH_EVALUATIONS,
  payload: evaluations
});

export const updateCurrentSubject = (subject) => ({
  type: UPDATE_CURRENT_SUBJECT,
  payload: subject
});
