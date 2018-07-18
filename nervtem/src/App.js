import Nerv from 'nervjs'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import GamePage from './Game';

import "./assets/reset.css"
import "./assets/style.css"

const App = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/game" component={GamePage} />
            </Switch>
        </div>
    </Router>
);

export default App