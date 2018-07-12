import Nerv from 'nervjs'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Game from './Game';

const App = () => (
    <Router>
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/game">About</Link></li>
                </ul>
            </nav>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
        </div>
    </Router>
);

export default App