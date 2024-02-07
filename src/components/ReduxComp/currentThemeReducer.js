// currentThemeReducer.js
import { UPDATE_CURRENT_THEME } from './actions';

const initialState = JSON.parse(localStorage.getItem('currentTheme')) || null;

const currentThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_THEME:
      const newState = {
        ...state,
        currentTheme: action.payload
      };
      localStorage.setItem('currentTheme', JSON.stringify(newState.currentTheme));
      return newState;
    default:
      return state;
  }
};

export default currentThemeReducer;
