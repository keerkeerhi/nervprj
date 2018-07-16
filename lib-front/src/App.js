import Nerv from 'nervjs'
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import GamePage from './Game';
import Login from './Login';
import Back from './back/Back';

import "./assets/reset.css"
import "./assets/swiper-4.3.3.min.css"
import "./assets/style.css"

const App = () => (
    <Router>
        <div>
            <Route path="/index" component={Home} />
            <Route path="/game" component={GamePage} />
            <Route path="/login" component={Login} />
            <Route path="/back" component={Back} />
        </div>
    </Router>
);

export default App