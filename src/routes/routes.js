import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";
import Video from "../components/admin/Video/Video.js";
import ViewVideo from "../components/admin/Video/ViewVideo.js";
import EditVideo from "../components/admin/Video/EditVideo.js";
import Breakpoint from "../components/admin/Video/Breakpoint.js";
import ViewBreakpoint from "../components/admin/Video/ViewBreakpoint.js";
import EditBreakpoint from "../components/admin/Video/EditBreakpoint.js";
import ViewTeacherTopic from "../components/admin/Teacher/ViewTeacherTopic.js";
import AddTeacherTopic from "../components/admin/Teacher/AddTeacherTopic.js";
import EditTeacherTopic from "../components/admin/Teacher/EditTeacherTopic.js";
import ViewTeacherVideo from "../components/admin/Teacher/ViewTeacherVideo.js";
import AddTeacherVideo from "../components/admin/Teacher/AddTeacherVideo.js";
import EditTeacherVideo from "../components/admin/Teacher/EditTeacherVideo.js";
import AddEvaluation from "../components/admin/Evaluation/AddEvaluation.js";
import ViewEvaluation from "../components/admin/Evaluation/ViewEvaluation.js";
import EditEvaluation from "../components/admin/Evaluation/EditEvaluation.js";
import AddEvaluationSubject from "../components/admin/Evaluation/AddEvaluationSubject.js";
import ViewEvaluationSubject from "../components/admin/Evaluation/ViewEvaluationSubject.js";
import EditEvaluationSubject from "../components/admin/Evaluation/EditEvaluationSubject.js";
import AddEvaluationSource from "../components/admin/Evaluation/AddEvaluationSource.js";
import ViewEvaluationSource from "../components/admin/Evaluation/ViewEvaluationSource.js";
import EditEvaluationSource from "../components/admin/Evaluation/EditEvaluationSource.js";
import AddEvaluationSubjectSource from "../components/admin/Evaluation/AddEvaluationSubjectSource.js";
import ViewEvaluationSubjectSource from "../components/admin/Evaluation/ViewEvaluationSubjectSource.js";
import EditEvaluationSubjectSource from "../components/admin/Evaluation/EditEvaluationSubjectSource.js";
import AddEvaluationItem from "../components/admin/Evaluation/AddEvaluationItem.js";
import ViewEvaluationItem from "../components/admin/Evaluation/ViewEvaluationItem.js";
import EditEvaluationItem from "../components/admin/Evaluation/EditEvaluationItem.js";
import AddEvaluationAnswer from "../components/admin/Evaluation/AddEvaluationAnswer.js";
import ViewEvaluationAnswer from "../components/admin/Evaluation/ViewEvaluationAnswer.js";
import EditEvaluationAnswer from "../components/admin/Evaluation/EditEvaluationAnswer.js";
import AddEvaluationOption from "../components/admin/Evaluation/AddEvaluationOption.js";
import ViewEvaluationOption from "../components/admin/Evaluation/ViewEvaluationOption.js";
import EditEvaluationOption from "../components/admin/Evaluation/EditEvaluationOption.js";
import AddEvaluationAnswerOption from "../components/admin/Evaluation/AddEvaluationAnswerOption.js";
import ViewEvaluationAnswerOption from "../components/admin/Evaluation/ViewEvaluationAnswerOption.js";
import EditEvaluationAnswerOption from "../components/admin/Evaluation/EditEvaluationAnswerOption.js";
import AddEvaluationFormPage from "../components/admin/Evaluation/AddEvaluationFormPage.js";
import ViewEvaluationFormPage from "../components/admin/Evaluation/ViewEvaluationFormPage.js";
import EditEvaluationFormPage from "../components/admin/Evaluation/EditEvaluationFormPage.js";
import AddSubtopic from "../components/admin/Teacher/AddSubtopic.js";
import ViewSubtopic from "../components/admin/Teacher/ViewSubtopic.js";
import EditSubtopic from "../components/admin/Teacher/EditSubtopic.js";
import AddSubtopicImage from "../components/admin/Teacher/AddSubtopicImage.js";
import ViewSubtopicImage from "../components/admin/Teacher/ViewSubtopicImage.js";
import EditSubtopicImage from "../components/admin/Teacher/EditSubtopicImage.js";
import AddFlipCard from "../components/admin/Teacher/AddFlipCard.js";
import ViewFlipCard from "../components/admin/Teacher/ViewFlipCard.js";
import EditFlipCard from "../components/admin/Teacher/EditFlipCard.js";
import AddTestItem from "../components/admin/Test/AddTestItem.js";
import ViewTestItem from "../components/admin/Test/ViewTestItem.js";
import EditTestItem from "../components/admin/Test/EditTestItem.js";
import AddTestItemColumn from "../components/admin/Test/AddTestItemColumn.js";
import ViewTestItemColumn from "../components/admin/Test/ViewTestItemColumn.js";
import EditTestItemColumn from "../components/admin/Test/EditTestItemColumn.js";
import AddTestItemOption from "../components/admin/Test/AddTestItemOption.js";
import ViewTestItemOption from "../components/admin/Test/ViewTestItemOption.js";
import EditTestItemOption from "../components/admin/Test/EditTestItemOption.js";
import AddFormativeTest from "../components/admin/Test/AddFormativeTest.js";
import ViewFormativeTest from "../components/admin/Test/ViewFormativeTest.js";
import EditFormativeTest from "../components/admin/Test/EditFormativeTest.js";
import AddFormativeTestItem from "../components/admin/Test/AddFormativeTestItem.js";
import ViewFormativeTestItem from "../components/admin/Test/ViewFormativeTestItem.js";
import EditFormativeTestItem from "../components/admin/Test/EditFormativeTestItem.js";
import AddSummativeTest from "../components/admin/Test/AddSummativeTest.js";
import ViewSummativeTest from "../components/admin/Test/ViewSummativeTest.js";
import EditSummativeTest from "../components/admin/Test/EditSummativeTest.js";
import AddSummativeTestItem from "../components/admin/Test/AddSummativeTestItem.js";
import ViewSummativeTestItem from "../components/admin/Test/ViewSummativeTestItem.js";
import EditSummativeTestItem from "../components/admin/Test/EditSummativeTestItem.js";
import Login from "../components/admin/AuthForms/Login.js";
import Register from "../components/admin/AuthForms/Register.js";
import ForgotPassword from "../components/admin/AuthForms/ForgotPassword.js";
import ResetPassword from "../components/admin/AuthForms/ResetPassword.js";
import Page403 from "../components/errors/Page403.js";
import Page404 from "../components/errors/Page404.js";

const routes = [
  { path: '/admin', exact: true, name: 'Admin'},
  { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
  { path: '/admin/add-video', exact: true, name: 'Video', component: Video },  
  { path: '/admin/view-video', exact: true, name: 'ViewVideo', component: ViewVideo },    
  { path: '/admin/edit-video/:id', exact: true, name: 'EditVideo', component: EditVideo }, 

  { path: '/admin/add-breakpoint', exact: true, name: 'Breakpoint', component: Breakpoint },  
  { path: '/admin/view-breakpoint', exact: true, name: 'ViewBreakpoint', component: ViewBreakpoint },
  { path: '/admin/edit-breakpoint/:id', exact: true, name: 'EditBreakpoint', component: EditBreakpoint },  

  { path: '/admin/view-teacher-topic', exact: true, name: 'ViewTeacherTopic', component: ViewTeacherTopic },
  { path: '/admin/add-teacher-topic', exact: true, name: 'AddTeacherTopic', component: AddTeacherTopic },
  { path: '/admin/edit-teacher-topic/:id', exact: true, name: 'EditTeacherTopic', component: EditTeacherTopic },

  { path: '/admin/view-teacher-video', exact: true, name: 'ViewTeacherVideo', component: ViewTeacherVideo }, 
  { path: '/admin/add-teacher-video', exact: true, name: 'AddTeacherVideo', component: AddTeacherVideo }, 
  { path: '/admin/edit-teacher-video/:id', exact: true, name: 'EditTeacherVideo', component: EditTeacherVideo },

  { path: '/admin/add-evaluation', exact: true, name: 'AddEvaluation', component: AddEvaluation },
  { path: '/admin/view-evaluation', exact: true, name: 'ViewEvaluation', component: ViewEvaluation }, 
  { path: '/admin/edit-evaluation/:id', exact: true, name: 'EditEvaluation', component: EditEvaluation },

  { path: '/admin/add-evaluation-subject', exact: true, name: 'AddEvaluationSubject', component: AddEvaluationSubject },
  { path: '/admin/view-evaluation-subject', exact: true, name: 'ViewEvaluationSubject', component: ViewEvaluationSubject },
  { path: '/admin/edit-evaluation-subject/:id', exact: true, name: 'EditEvaluationSubject', component: EditEvaluationSubject },

  { path: '/admin/add-evaluation-source', exact: true, name: 'AddEvaluationSource', component: AddEvaluationSource },
  { path: '/admin/view-evaluation-source', exact: true, name: 'ViewEvaluationSource', component: ViewEvaluationSource },
  { path: '/admin/edit-evaluation-source/:id', exact: true, name: 'EditEvaluationSource', component: EditEvaluationSource },

  { path: '/admin/add-evaluation-subject-source', exact: true, name: 'AddEvaluationSubjectSource', component: AddEvaluationSubjectSource },
  { path: '/admin/view-evaluation-subject-source', exact: true, name: 'ViewEvaluationSubjectSource', component: ViewEvaluationSubjectSource },
  { path: '/admin/edit-evaluation-subject-source/:id', exact: true, name: 'EditEvaluationSubjectSource', component: EditEvaluationSubjectSource },

  { path: '/admin/add-evaluation-item', exact: true, name: 'AddEvaluationItem', component: AddEvaluationItem },
  { path: '/admin/view-evaluation-item', exact: true, name: 'ViewEvaluationItem', component: ViewEvaluationItem },
  { path: '/admin/edit-evaluation-item/:id', exact: true, name: 'EditEvaluationItem', component: EditEvaluationItem },

  { path: '/admin/add-evaluation-answer', exact: true, name: 'AddEvaluationAnswer', component: AddEvaluationAnswer },
  { path: '/admin/view-evaluation-answer', exact: true, name: 'ViewEvaluationAnswer', component: ViewEvaluationAnswer },
  { path: '/admin/edit-evaluation-answer/:id', exact: true, name: 'EditEvaluationAnswer', component: EditEvaluationAnswer },

  { path: '/admin/add-evaluation-option', exact: true, name: 'AddEvaluationOption', component: AddEvaluationOption },
  { path: '/admin/view-evaluation-option', exact: true, name: 'ViewEvaluationOption', component: ViewEvaluationOption },
  { path: '/admin/edit-evaluation-option/:id', exact: true, name: 'EditEvaluationOption', component: EditEvaluationOption },

  { path: '/admin/add-evaluation-answer-option', exact: true, name: 'AddEvaluationAnswerOption', component: AddEvaluationAnswerOption },
  { path: '/admin/view-evaluation-answer-option', exact: true, name: 'ViewEvaluationAnswerOption', component: ViewEvaluationAnswerOption },
  { path: '/admin/edit-evaluation-answer-option/:id', exact: true, name: 'EditEvaluationAnswerOption', component: EditEvaluationAnswerOption },

  { path: '/admin/add-evaluation-form-page', exact: true, name: 'AddEvaluationFormPage', component: AddEvaluationFormPage },
  { path: '/admin/view-evaluation-form-page', exact: true, name: 'ViewEvaluationFormPage', component: ViewEvaluationFormPage },
  { path: '/admin/edit-evaluation-form-page/:id', exact: true, name: 'EditEvaluationFormPage', component: EditEvaluationFormPage },

  { path: '/admin/add-subtopic', exact: true, name: 'AddSubtopic', component: AddSubtopic },
  { path: '/admin/view-subtopic', exact: true, name: 'ViewSubtopic', component: ViewSubtopic },
  { path: '/admin/edit-subtopic/:id', exact: true, name: 'EditSubtopic', component: EditSubtopic },

  { path: '/admin/add-subtopic-image', exact: true, name: 'AddSubtopicImage', component: AddSubtopicImage },
  { path: '/admin/view-subtopic-image', exact: true, name: 'ViewSubtopicImage', component: ViewSubtopicImage },
  { path: '/admin/edit-subtopic-image/:id', exact: true, name: 'EditSubtopicImage', component: EditSubtopicImage },

  { path: '/admin/add-flip-card', exact: true, name: 'AddFlipCard', component: AddFlipCard },
  { path: '/admin/view-flip-card', exact: true, name: 'ViewFlipCard', component: ViewFlipCard },
  { path: '/admin/edit-flip-card/:id', exact: true, name: 'EditFlipCard', component: EditFlipCard },

  { path: '/admin/add-test-item', exact: true, name: 'AddTestItem', component: AddTestItem },
  { path: '/admin/view-test-item', exact: true, name: 'ViewTestItem', component: ViewTestItem },
  { path: '/admin/edit-test-item/:id', exact: true, name: 'EditTestItem', component: EditTestItem },

  { path: '/admin/add-test-item-column', exact: true, name: 'AddTestItemColumn', component: AddTestItemColumn },
  { path: '/admin/view-test-item-column', exact: true, name: 'ViewTestItemColumn', component: ViewTestItemColumn },
  { path: '/admin/edit-test-item-column/:id', exact: true, name: 'EditTestItemColumn', component: EditTestItemColumn },

  { path: '/admin/add-test-item-option', exact: true, name: 'AddTestItemOption', component: AddTestItemOption },
  { path: '/admin/view-test-item-option', exact: true, name: 'ViewTestItemOption', component: ViewTestItemOption },
  { path: '/admin/edit-test-item-option/:id', exact: true, name: 'EditTestItemOption', component: EditTestItemOption },

  { path: '/admin/add-formative-test', exact: true, name: 'AddFormativeTest', component: AddFormativeTest },
  { path: '/admin/view-formative-test', exact: true, name: 'ViewFormativeTest', component: ViewFormativeTest },
  { path: '/admin/edit-formative-test/:id', exact: true, name: 'EditFormativeTest', component: EditFormativeTest },

  { path: '/admin/add-formative-test-item', exact: true, name: 'AddFormativeTestItem', component: AddFormativeTestItem },
  { path: '/admin/view-formative-test-item', exact: true, name: 'ViewFormativeTestItem', component: ViewFormativeTestItem },
  { path: '/admin/edit-formative-test-item/:id', exact: true, name: 'EditFormativeTestItem', component: EditFormativeTestItem },

  { path: '/admin/add-summative-test', exact: true, name: 'AddSummativeTest', component: AddSummativeTest },
  { path: '/admin/view-summative-test', exact: true, name: 'ViewSummativeTest', component: ViewSummativeTest },
  { path: '/admin/edit-summative-test/:id', exact: true, name: 'EditSummativeTest', component: EditSummativeTest },

  { path: '/admin/add-summative-test-item', exact: true, name: 'AddSummativeTestItem', component: AddSummativeTestItem },
  { path: '/admin/view-summative-test-item', exact: true, name: 'ViewSummativeTestItem', component: ViewSummativeTestItem },
  { path: '/admin/edit-summative-test-item/:id', exact: true, name: 'EditSummativeTestItem', component: EditSummativeTestItem },

  { path: '/admin/login', exact: true, name: 'Login', component: Login },
  { path: '/admin/register', exact: true, name: 'Register', component: Register },
  { path: '/admin/forgot-password', exact: true, name: 'ForgotPassword', component: ForgotPassword },
  { path: '/admin/reset-password', exact: true, name: 'ResetPassword', component: ResetPassword },

  { path: '/admin/403', exact: true, name: 'error403', component: Page403 },
  { path: '/admin/404', exact: true, name: 'error404', component: Page404 },

  
];

export default routes;