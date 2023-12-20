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
];

export default routes;