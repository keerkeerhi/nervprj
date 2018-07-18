import Nerv from 'nervjs'
import { Route } from "react-router-dom";
import ss from "./Home.css"

class Home extends Nerv.Component {
    constructor() {
        super(...arguments);
    }

    getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        else {
            var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }
    render() {
        let windowH = this.getClientHeight();
        return (
            <div className={ss.container}>
                home...
            </div>
        )
    }

}

export default Home