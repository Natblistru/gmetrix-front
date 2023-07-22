import React from "react"
import { createStore, combineReducers } from "redux"
import { Provider, connect } from "react-redux"

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
          //   proc: 100
          //  },
          // ]
          tests: []
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
  tests: testsReducer
})

const store = createStore(combinedReducers)

export default function StoreComponent({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
