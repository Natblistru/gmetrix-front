import React from "react"
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import { Provider, connect } from "react-redux"
import breadcrumbReducer from "./breadcrumbReducer";
import disciplineAniReducer from './disciplineAniReducer';
import teachersForSubtitleReducer from "./teachersForSubtitleReducer";
import capitoleReducer from './capitoleReducer';
import currentThemeReducer from './currentThemeReducer';
import themeVideoReducer from './themeVideoReducer';
import evaluationReducer from "./evaluationReducer";
import evaluation1Reducer from "./evaluation1Reducer";
import evaluation2Reducer from "./evaluation2Reducer";
import evaluation3Reducer from "./evaluation3Reducer";
import currentSubjectReducer from "./currentSubjectReducer";
import topicsReducer from "./topicsReducer";
import currentTopicReducer from "./currentTopicReducer";
import currentTestsReducer from "./currentTestsReducer";
import currentIndexTestReducer from "./currentIndexTestReducer";
import studentReducer from "./studentReducer";
import raspunsuriReducer from './raspunsuriReducer';

const initialState = {
  items: []
};
const initialTeststState = {
  items: [{user: "Current user",
          //   tests: [
          //   {
          //   id: "1",
          //   quiz: "2",
          //   item: "1",
          //   proc: 80
          //  },
          // ]
          tests: []
        }]
};
const testsReducer = (state=initialTeststState, action) => {
  switch (action.type) {
    case 'ADD_TEST':
      return {
        ...state,
        items: state.items.map(userItem => {
          if (userItem.user === "Current user") {
            return {
              ...userItem,
              tests: [...userItem.tests, action.payload] 
            };
          } else {
            return userItem;
          }
        })
      };
      case 'UPDATE_TEST':
        return {
          ...state,
          items: state.items.map(userItem => {
            if (userItem.user === "Current user") {
              return {
                ...userItem,
                tests: userItem.tests.map(testItem =>
                  testItem.id == action.payload.id && testItem.quiz == action.payload.quiz && testItem.item == action.payload.item
                    ? action.payload 
                    : testItem
                )
              };
            } else {
              return userItem;
            }
          })
        };
        case 'DELETE_TEST':
          return {
            ...state,
            items: state.items.map(userItem => {
              if (userItem.user === "Current user") {
                return {
                  ...userItem,
                  tests: state.tests.filter(item => item.id != action.payload.id && item.quiz != action.payload.quiz && item.item != action.payload.item) 
                };
              } else {
                return userItem;
              }
            })
          };
          default:
            return state;
  }
};
const textReducer = ( state = "", action )=> {
  switch (action.type) {
    case " update":
      return action.payload
      default:
        return state
  }
}

const combinedReducers = combineReducers({
  raspunsuri: raspunsuriReducer,
  text: textReducer,
  tests: testsReducer,
  breadcrumb: breadcrumbReducer,
  disciplineAni: disciplineAniReducer,
  teachersForSubtitle: teachersForSubtitleReducer,
  capitole: capitoleReducer,
  currentTheme: currentThemeReducer,
  themeVideo: themeVideoReducer,
  evaluations: evaluationReducer,
  evaluations1: evaluation1Reducer,
  evaluations2: evaluation2Reducer,
  evaluations3: evaluation3Reducer,
  currentSubject: currentSubjectReducer,
  topics: topicsReducer,
  currentTopic: currentTopicReducer,
  currentTests: currentTestsReducer,
  currentIndexTest: currentIndexTestReducer,
  currentStudent: studentReducer,
})

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk) 
);

export default function StoreComponent({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
