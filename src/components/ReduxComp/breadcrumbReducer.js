import { ADD_BREADCRUMB } from './actions';
import { UPDATE_SUBJECT_BREADCRUMB } from './actions';
import { UPDATE_TOPIC_BREADCRUMB } from './actions';
import { UPDATE_SUBTOPIC_BREADCRUMB } from './actions';

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
        localStorage.setItem('breadcrumbs', JSON.stringify(newState));
        return newState;
      }

    case UPDATE_SUBJECT_BREADCRUMB:
      if (state.length === 1) {
        return [...state, action.payload];
      } else if (state.length > 1) {
        const updatedBreadcrumb = [...state];
        updatedBreadcrumb[1] = action.payload;
        return updatedBreadcrumb;
      }
      return state;

    case UPDATE_TOPIC_BREADCRUMB:
      if (state.length === 2) {
        return [...state, action.payload];
      } else if (state.length > 2) {
        const updatedBreadcrumb = [...state];
        updatedBreadcrumb[2] = action.payload;
        return updatedBreadcrumb;
      }
      return state;

    case UPDATE_SUBTOPIC_BREADCRUMB:
      if (state.length === 3) {
        return [...state, action.payload];
      } else if (state.length > 3) {
        const updatedBreadcrumb = [...state];
        updatedBreadcrumb[3] = action.payload;
        return updatedBreadcrumb;
      }
      return state;

    default:
      return state;
  }
};

export default breadcrumbReducer;