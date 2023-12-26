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

];

export default routes;