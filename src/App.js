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
import TemeRom from "./pages/TemeRom";
import TemeMatem from "./pages/TemeMatem";
import TemeIstoria from "./pages/TemeIstoria";
import Test from "./pages/Test";
import TestWords from "./components/Teste/TestWords.jsx";
import TestGeneralizator from "./components/Teste/TestGeneralizator";
import FlipCards from "./components/FlipCards/FlipCards";
import ExamenSubect1 from "./components/Teste/ExamenSubect1";
import ExamenSubect3 from "./components/Teste/ExamenSubject3";
import Error from "./components/Error";
import Raspunsuri from "./components/context/Raspunsuri";

const FlipCardsWithRouter = withRouter(FlipCards);
const TestWithRouter = withRouter(Test);

function App() {
  return (
    <div className="App">
      <div>
        <Raspunsuri>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/istoria/:address/examen-subiect1" component={ExamenSubect1} />
            <Route path="/istoria/:address/examen-subiect3" component={ExamenSubect3} />
            <Route path="/istoria/:address/flipCards/ani" component={FlipCardsWithRouter} />
            <Route path="/istoria/:address/flipCards/termeni" component={FlipCardsWithRouter} />
            <Route path="/istoria/:address/:address1/:addressTest/:idTest" component={TestWithRouter} />
            <Route path="/istoria/:address/:address1" component={Subtema} />
            <Route path="/istoria/:address" component={Tema} />
            <Route exact path="/home" component={Home} />
            <Route path="/romana" component={TemeRom} />
            <Route path="/matem" component={TemeMatem} />
            <Route path="/istoria" component={TemeIstoria} />
            <Route path="/word" component={TestWords} />
            <Route path="/tema1" component={Tema} />
            <Route path="/subtema1" component={Subtema} />
            <Route path="/test1" component={TestGeneralizator} />

            <Route component={Error} />
          </Switch>
        </Raspunsuri>
      </div>
    </div>
  );
}

export default App;
