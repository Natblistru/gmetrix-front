import { FETCH_THEME_VIDEO_SUCCESS, FETCH_THEME_VIDEO_FAILURE } from './actions';

const initialState = {
  themeVideo: JSON.parse(localStorage.getItem('themeVideo')) || null
};

const themeVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THEME_VIDEO_SUCCESS:
      localStorage.setItem('themeVideo', JSON.stringify(action.payload));
      return {
        ...state,
        themeVideo: action.payload
      };
    case FETCH_THEME_VIDEO_FAILURE:
      return {
        ...state,
        themeVideo: null
      };
    default:
      return state;
  }
};

export default themeVideoReducer;