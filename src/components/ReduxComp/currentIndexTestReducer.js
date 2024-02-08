import { FETCH_CURRENT_INDEX_TEST } from './actions';

const initialState = {
  currentIndexTest: JSON.parse(localStorage.getItem('currentIndexTest')) || 0
};

const currentIndexTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_INDEX_TEST:
      localStorage.setItem('currentIndexTest', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default currentIndexTestReducer;
