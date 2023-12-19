import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";
import Video from "../components/admin/Video/Video.js";
import ViewVideo from "../components/admin/Video/ViewVideo.js";
import EditVideo from "../components/admin/Video/EditVideo.js";

const routes = [
  { path: '/admin', exact: true, name: 'Admin'},
  { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
  { path: '/admin/add-video', exact: true, name: 'Video', component: Video },  
  { path: '/admin/view-video', exact: true, name: 'ViewVideo', component: ViewVideo },    
  { path: '/admin/edit-video/:id', exact: true, name: 'EditVideo', component: EditVideo }, 
];

export default routes;