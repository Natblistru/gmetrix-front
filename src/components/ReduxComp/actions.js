export const ADD_BREADCRUMB = 'ADD_BREADCRUMB';
export const UPDATE_SUBJECT_BREADCRUMB = 'UPDATE_SUBJECT_BREADCRUMB';
export const UPDATE_TOPIC_BREADCRUMB = 'UPDATE_TOPIC_BREADCRUMB';
export const UPDATE_SUBTOPIC_BREADCRUMB = 'UPDATE_SUBTOPIC_BREADCRUMB';
export const FETCH_DISCIPLINE = 'FETCH_DISCIPLINE';
export const FETCH_SUBTITLE_TEACHERS = 'FETCH_SUBTITLE_TEACHERS';

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