import { FETCH_SUBTITLE_TEACHERS } from './actions';

const initialState = JSON.parse(localStorage.getItem('teachersForSubtitle')) || [];

const teachersForSubtitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBTITLE_TEACHERS:
      localStorage.setItem('teachersForSubtitle', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default teachersForSubtitleReducer;
