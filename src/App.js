import React from "react";
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
import Test from "./pages/Test";
import TestWords from "./components/Teste/TestWords.jsx";
import TestGeneralizator from "./components/Teste/TestGeneralizator";
import FlipCards from "./components/FlipCards/FlipCards";
import ExamenSubect1 from "./components/Teste/ExamenSubect1";
import ExamenSubect2 from "./components/Teste/ExamenSubject2";
import ExamenSubect3 from "./components/Teste/ExamenSubject3";
import Error from "./components/Error";
import Raspunsuri from "./components/context/Raspunsuri";
import StoreComponent from "./components/ReduxComp/StoreComponent";
import ContextData from "./components/context/ContextData.js";
import StateData from "./components/context/StateData.js";
import ReducerData from "./components/context/ReducerData.js";

const FlipCardsWithRouter = withRouter(FlipCards);
const TestWithRouter = withRouter(Test);

function App() {
  const [stateData, dispatchData] = React.useReducer(ReducerData, StateData)
  return (
    <div className="App">
      <div>
        <ContextData.Provider value = {{stateData, dispatchData}}>
          <StoreComponent>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/istoria/:address/examen-subiect1" component={ExamenSubect1} />
              <Route path="/istoria/:address/examen-subiect2" component={ExamenSubect2} />
              <Route path="/istoria/:address/examen-subiect3" component={ExamenSubect3} />
              <Route path="/istoria/:address/flipCards/ani" component={FlipCardsWithRouter} />
              <Route path="/istoria/:address/flipCards/termeni" component={FlipCardsWithRouter} />
              <Route path="/istoria/:address/:address1/:addressTest/:idTest" component={TestWithRouter} />
              <Route path="/capitole/:id" component={Capitole} />
              <Route path="/:disciplina/:address/:address1" component={Subtema} />
              <Route path="/:disciplina/:address" component={Tema} />
              <Route exact path="/home" component={Home} />
              <Route path="/word" component={TestWords} />
              <Route path="/tema1" component={Tema} />           {/*dupa DEPLOY  de sters */}
              <Route path="/subtema1" component={Subtema} />     {/*dupa DEPLOY  de sters */}
              <Route path="/test1" component={TestGeneralizator} />

              <Route component={Error} />
            </Switch>
          </StoreComponent>
        </ContextData.Provider>
      </div>
    </div>
  );
}

export default App;
