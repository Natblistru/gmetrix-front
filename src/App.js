import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Tema from "./pages/Tema";
import Subtema from "./pages/Subtema";
import Capitole from "./pages/Capitole";
// import Test from "./pages/Test";
import Test from "./components/beta/TesteAll_beta.jsx"
import TestWords from "./components/Teste/TestWords.jsx";
import TestGeneralizator from "./components/Teste/TestGeneralizator";
import FlipCards from "./components/FlipCards/FlipCards";
import ExamenSubect1 from "./components/Teste/ExamenSubect1";
import ExamenSubect2 from "./components/Teste/ExamenSubject2";
import ExamenSubect3 from "./components/Teste/ExamenSubject3";
import Error from "./components/Error";
import FlipCards_beta from "./components/beta/FlipCards_beta";
import TesteAll_beta from "./components/beta/TesteAll_beta.jsx";
import Raspunsuri from "./components/context/Raspunsuri";
import StoreComponent from "./components/ReduxComp/StoreComponent";
import ContextData from "./components/context/ContextData.js";
import StateData from "./components/context/StateData.js";
import ReducerData from "./components/context/ReducerData.js";
import MasterLayout from "./layouts/admin/MasterLayout.js";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import ForgotPassword from "./components/auth/ForgotPassword.js";
import AdminPrivateRoute from "./routes/AdminPrivateRoute.js";
import Page403 from "./components/errors/Page403.js";
import Page404 from "./components/errors/Page404.js";
import ResetPassword from "./components/auth/ResetPassword.js";
import UserProfile from "./pages/UserProfile.jsx";
import Capitole_beta from "./components/beta/Capitole_beta.jsx";
import ExamenSubect_beta from "./components/beta/ExamenSubect_beta.jsx";
import FlipCards_beta_eval from "./components/beta/FlipCards_beta_eval.jsx";
import ExamenFinal from "./components/beta/ExamenFinal.jsx";


const FlipCardsWithRouter = withRouter(FlipCards);
const TestWithRouter = withRouter(Test);

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
console.log(axios.defaults.baseURL)
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {
  const [stateData, dispatchData] = React.useReducer(ReducerData, StateData)
  return (
    <div className="App">
      <div>
      <StoreComponent>
        <ContextData.Provider value = {{stateData, dispatchData}}>
            <Switch>

              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/403" component={Page403} />
              <Route path="/404" component={Page404} />
              <Route path="/login">
                {localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route path="/register">
                {localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Register />}
              </Route>
              <Route path="/forgot-password" component={ForgotPassword} />  
              <Route path="/reset-password/:token" component={ResetPassword} /> 
              <Route path="/user/:activepage" component={UserProfile} /> 
              <AdminPrivateRoute path="/admin" name="Admin" />
              <Route path="/examen-final/:id" component={ExamenFinal} />
              <Route path="/:disciplina/:address/examen-subiect1" component={ExamenSubect1} />
              <Route path="/:disciplina/:address/examen-subiect2" component={ExamenSubect2} />
              <Route path="/:disciplina/:address/examen-subiect3" component={ExamenSubect3} />
              <Route path="/:disciplina/:address/examen-subiect-all" component={ExamenSubect_beta} />
              <Route path="/:disciplina/:address/:address1/:addressTest/:idTest" component={TestWithRouter} />
              <Route path="/:disciplina/:address/:address1/memo" component={FlipCards_beta} /> 
              <Route path="/:disciplina/:address/memo" component={FlipCards_beta_eval} /> 
              <Route path="/capitole/:id" component={Capitole} />
              <Route path="/capitole_beta/:id" component={Capitole_beta} />
              <Route path="/:disciplina/:address/:address1" component={Subtema} />
              <Route path="/:disciplina/:address" component={Tema} />

              {/* <Route path="/examen-final/:disciplina" component={ExamenFinal} /> */}
              <Route exact path="/home" component={Home} />
              <Route component={Error} />
            </Switch>
          </ContextData.Provider>
        </StoreComponent>
      </div>
    </div>
  );
}

export default App;
