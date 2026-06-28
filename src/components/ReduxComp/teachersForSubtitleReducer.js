import { FETCH_SUBTITLE_TEACHERS } from './actions';

const getInitialState = () => {
  const savedData = localStorage.getItem('teachersForSubtitle');

  if (!savedData || savedData === 'undefined') {
    return [];
  }

  try {
    const parsedData = JSON.parse(savedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error('Eroare la citirea teachersForSubtitle din localStorage:', error);

    localStorage.removeItem('teachersForSubtitle');

    return [];
  }
};

const initialState = getInitialState();

const teachersForSubtitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBTITLE_TEACHERS: {
      const payload = Array.isArray(action.payload) ? action.payload : [];

      localStorage.setItem('teachersForSubtitle', JSON.stringify(payload));

      return payload;
    }

    default:
      return state;
  }
};

export default teachersForSubtitleReducer;