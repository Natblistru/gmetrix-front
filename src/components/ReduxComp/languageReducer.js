// languageReducer.js
const initialState = 'en'; // Limba implicită este 'en'

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload;
    default:
      return state;
  }
};

export default languageReducer;
