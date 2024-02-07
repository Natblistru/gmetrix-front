import { FETCH_THEME_VIDEO_SUCCESS, FETCH_THEME_VIDEO_FAILURE } from './actions';

const initialState = JSON.parse(localStorage.getItem('themeVideo')) || [];

const themeVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THEME_VIDEO_SUCCESS:
      localStorage.setItem('themeVideo', JSON.stringify(action.payload));
      return action.payload;
    case FETCH_THEME_VIDEO_FAILURE:
      localStorage.setItem('themeVideo', JSON.stringify([])); // Salvare ca un array gol în caz de eșec
      return [];
    default:
      return state;
  }
};


export default themeVideoReducer;