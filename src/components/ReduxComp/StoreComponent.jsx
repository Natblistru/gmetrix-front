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
import themePresentationReducer from './themePresentationReducer';
import evaluationReducer from "./evaluationReducer";
import evaluation1Reducer from "./evaluation1Reducer";
import evaluation2Reducer from "./evaluation2Reducer";
import evaluation3Reducer from "./evaluation3Reducer";
import currentSubjectReducer from "./currentSubjectReducer";
import topicsReducer from "./topicsReducer";
import currentTopicReducer from "./currentTopicReducer";
import currentTestsReducer from "./currentTestsReducer";
import allTeacherTestsReducer from "./allTeacherTestsReducer";
import currentIndexTestReducer from "./currentIndexTestReducer";
import studentReducer from "./studentReducer";
import raspunsuriReducer from './raspunsuriReducer';
import evaluationAllReducer from "./evaluationAllReducer";
import languageReducer from './languageReducer';

const combinedReducers = combineReducers({
  raspunsuri: raspunsuriReducer,
  breadcrumb: breadcrumbReducer,
  disciplineAni: disciplineAniReducer,
  teachersForSubtitle: teachersForSubtitleReducer,
  capitole: capitoleReducer,
  currentTheme: currentThemeReducer,
  themeVideo: themeVideoReducer,
  themePresentation: themePresentationReducer,
  evaluations: evaluationReducer,
  evaluations1: evaluation1Reducer,
  evaluations2: evaluation2Reducer,
  evaluations3: evaluation3Reducer,
  evaluations_all: evaluationAllReducer,
  currentSubject: currentSubjectReducer,
  topics: topicsReducer,
  currentTopic: currentTopicReducer,
  currentTests: currentTestsReducer,
  allTeacherTests: allTeacherTestsReducer,
  currentIndexTest: currentIndexTestReducer,
  currentStudent: studentReducer,
  language: languageReducer,
})

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk) 
);

export default function StoreComponent({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
