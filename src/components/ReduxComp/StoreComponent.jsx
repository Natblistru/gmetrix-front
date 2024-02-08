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

const initialState = {
  items: []
};
const initialResultState = {
  items: [{user: "Current user",
          //  subject: [
          //   {
          //   id: "1",
          //   audio: "1",
          //   proc: 60
          //  },
          // ]
          subject: []
        }]
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
const initialExamsState = {
  items: [{user: "Current user",
          //   exams: [
          //   {
          //   id: "1",
          //   subiect: "1",
          //   superitem: "1",
          //   item: "1",
          //   proc: 100
          //  },
          exams: []
        }]
};

const raspunsuriReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
      case 'UPDATE_ITEM':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? action.payload : item
          )
        };
      case 'DELETE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload)
        };
      default:
        return state;
  }
};

const resultsReducer = (state=initialResultState, action) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return {
        ...state,
        items: state.items.map(userItem => {
          if (userItem.user === "Current user") {
            return {
              ...userItem,
              subject: [...userItem.subject, action.payload] 
            };
          } else {
            return userItem;
          }
        })
      };
      case 'UPDATE_RESULT':
        return {
          ...state,
          items: state.items.map(userItem => {
            if (userItem.user === "Current user") {
              return {
                ...userItem,
                subject: userItem.subject.map(subjectItem =>
                  subjectItem.id === action.payload.id && subjectItem.audio === action.payload.audio
                    ? action.payload 
                    : subjectItem
                )
              };
            } else {
              return userItem;
            }
          })
        };
        case 'DELETE_RESULT':
          return {
            ...state,
            items: state.items.map(userItem => {
              if (userItem.user === "Current user") {
                return {
                  ...userItem,
                  subject: state.subject.filter(item => item.id != action.payload.id && item.audio != action.payload.audio) 
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
const examsReducer = (state=initialExamsState, action) => {
  switch (action.type) {
    case 'ADD_EXAM':
      return {
        ...state,
        items: state.items.map(userItem => {
          if (userItem.user === "Current user") {
            return {
              ...userItem,
              exams: [...userItem.exams, action.payload] 
            };
          } else {
            return userItem;
          }
        })
      };
      case 'UPDATE_EXAM':
        return {
          ...state,
          items: state.items.map(userItem => {
            if (userItem.user === "Current user") {
              return {
                ...userItem,
                exams: userItem.exams.map(examItem =>
                  examItem.id == action.payload.id && examItem.subiect == action.payload.subiect && examItem.item == action.payload.item
                    ? action.payload 
                    : examItem
                )
              };
            } else {
              return userItem;
            }
          })
        };
        case 'DELETE_EXAM':
          return {
            ...state,
            items: state.items.map(userItem => {
              if (userItem.user === "Current user") {
                return {
                  ...userItem,
                  exams: state.exams.filter(item => item.id != action.payload.id && item.subiect != action.payload.subiect && item.item != action.payload.item) 
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
  results: resultsReducer,
  tests: testsReducer,
  exams: examsReducer,
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
