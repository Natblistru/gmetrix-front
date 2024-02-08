import { ADD_BREADCRUMB, UPDATE_SUBJECT_BREADCRUMB, UPDATE_TOPIC_BREADCRUMB, UPDATE_SUBTOPIC_BREADCRUMB } from './actions';

// Funcție pentru a actualiza și salva în LocalStorage
const updateAndSaveToLocalStorage = (state) => {
  localStorage.setItem('breadcrumbs', JSON.stringify(state));
  return state;
};

const initialState = JSON.parse(localStorage.getItem('breadcrumbs')) || [];

const breadcrumbReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BREADCRUMB:
      const exists = state.some(item => (
        item && item.name === action.payload.name && item.path === action.payload.path
      ));
      if (exists) {
        return state;
      } else {
        const newState = [...state, action.payload];
        return updateAndSaveToLocalStorage(newState);
      }

    case UPDATE_SUBJECT_BREADCRUMB:
      if (state.length === 1) {
        return updateAndSaveToLocalStorage([...state, action.payload]);
      } else if (state.length > 1) {
        const updatedBreadcrumb = [...state];
        updatedBreadcrumb[1] = action.payload;
        return updateAndSaveToLocalStorage(updatedBreadcrumb);
      }
      return state;

    case UPDATE_TOPIC_BREADCRUMB:
      if (state.length === 2) {
        return updateAndSaveToLocalStorage([...state, action.payload]);
      } else if (state.length > 2) {
        const updatedBreadcrumb = [...state];
        updatedBreadcrumb[2] = action.payload;
        return updateAndSaveToLocalStorage(updatedBreadcrumb);
      }
      return state;

    case UPDATE_SUBTOPIC_BREADCRUMB:
      if (state.length === 3) {
        return updateAndSaveToLocalStorage([...state, action.payload]);
      } else if (state.length > 3) {
        const updatedBreadcrumb = [...state];
        updatedBreadcrumb[3] = action.payload;
        return updateAndSaveToLocalStorage(updatedBreadcrumb);
      }
      return state;

    default:
      return state;
  }
};

export default breadcrumbReducer;