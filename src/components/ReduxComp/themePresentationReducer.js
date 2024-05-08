import { FETCH_THEME_PRESENTATION_SUCCESS, FETCH_THEME_PRESENTATION_FAILURE } from './actions';

const initialState = JSON.parse(localStorage.getItem('themePresentation')) || [];

const themePresentationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THEME_PRESENTATION_SUCCESS:
      localStorage.setItem('themePresentation', JSON.stringify(action.payload));
      return action.payload;
    case FETCH_THEME_PRESENTATION_FAILURE:
      localStorage.setItem('themePresentation', JSON.stringify([])); // Salvare ca un array gol în caz de eșec
      return [];
    default:
      return state;
  }
};


export default themePresentationReducer;