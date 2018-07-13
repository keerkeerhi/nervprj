import Nerv from 'nervjs'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import GamePage from './Game';
import "./assets/reset.css"
import "./assets/swiper-4.3.3.min.css"

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={GamePage} />
        </div>
    </Router>
);

export default App