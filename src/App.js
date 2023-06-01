import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from './pages/Home';
import Tema from './pages/Tema';
import Subtema from './pages/Subtema';
import TemeRom from './pages/TemeRom';
import TemeMatem from './pages/TemeMatem';
import TemeIstoria from './pages/TemeIstoria';
import Test from './pages/Test';
import FlipCards from './components/FlipCards/FlipCards';

const FlipCardsWithRouter = withRouter(FlipCards);
const TestWithRouter = withRouter(Test);

function App() {

  return (
    <div className="App">
      <div>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home'>
          <Home />
        </Route> 
        <Route path='/teme-romana'>
          <TemeRom />
        </Route>    
        <Route path='/teme-matem'>
          <TemeMatem />
        </Route>  
        <Route path='/teme-istoria'>
          <TemeIstoria />
        </Route>   
        <Route path='/tema1'>
          <Tema />
        </Route>   
        <Route path='/subtema1'>
          <Subtema />
        </Route> 
        <Route path='/test1'>
          <TestWithRouter />
        </Route>     
        <Route path="/flipCards">
          <FlipCardsWithRouter />
        </Route>
      </div>
    </div>
  );
}

export default App;
