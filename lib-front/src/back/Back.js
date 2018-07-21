import Nerv from 'nervjs'
import { Route } from "react-router-dom";
import VLink from "../common/VLink"
import Banner from './Banner'
import Nav from './Nav'
import Article from './Article'
import Notice from './Notice'
import ss from './Back.css'

class Game extends Nerv.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'back'
        }
    }
    render() {
        let match = this.props.match
        return (
            <div>
                <ul className={ss.nav}>
                    <li>
                        <VLink to={`${match.url}/banner`} label="轮播图设置" />
                    </li>
                    <li>
                        <VLink to={`${match.url}/notice`} label="公告设置" />
                    </li>
                    <li>
                        <VLink to={`${match.url}/nav`} label="导航管理" />
                    </li>
                    <li>
                        <VLink to={`${match.url}/article`} label="文章管理" />
                    </li>
                </ul>
                <Route path={`${match.url}/banner`} component={Banner} />
                <Route path={`${match.url}/nav`} component={Nav} />
                <Route path={`${match.url}/article`} component={Article} />
                <Route path={`${match.url}/notice`} component={Notice} />
            </div>
        )
    }
}

export default Game