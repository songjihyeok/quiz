import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/login/login'
import Problem from './containers/problem/problem'
import BeforeProblem from './containers/beforeProblem/beforeProblem'
import Complete from './containers/complete/complete'
import NotOpen from './containers/notOpen/notOpen'

function App() {

  return (
    <div className="App">
           <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/beforeProblem/:number" exact component={BeforeProblem} />
            <Route path="/problem/:number" exact component={Problem} />
            <Route path="/complete" exact component={Complete} />
            <Route path="/notOpen" exact component={NotOpen} />
           </Switch>
    </div>
  );
}

export default App;
