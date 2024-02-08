import { UPDATE_CURRENT_TOPIC } from './actions';

const getInitialStateFromStorage = () => {
  const storedState = localStorage.getItem('currentTopic');
  return storedState ? JSON.parse(storedState) : { currentTopic: null };
};

const initialState = getInitialStateFromStorage();

const currentTopicReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_TOPIC:
      const newState = {
        ...state,
        currentTopic: action.payload
      };
      localStorage.setItem('currentTopic', JSON.stringify(newState)); 
      return newState;
    default:
      return state;
  }
};

export default currentTopicReducer;
