import Nerv from 'nervjs'
import { Route, Link } from "react-router-dom";
import ss from './IVLink.css'

const IVLink = ({ label, to, exact }) => (
    <Route
        path={to}
        exact={exact}
        children={({ match }) => (
            <div className={match ? ss.active : ss.normal}>
                <Link to={to}>{label}</Link>
            </div>
        )}
    />
);

export default IVLink