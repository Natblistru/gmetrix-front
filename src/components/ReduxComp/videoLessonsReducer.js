import { FETCH_VIDEO_LESSONS } from "./actions";

const initialState = [];

const videoLessonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEO_LESSONS:
      return Array.isArray(action.payload) ? action.payload : [];

    default:
      return state;
  }
};

export default videoLessonsReducer;