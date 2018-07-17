import Nerv from 'nervjs'
import ss from "./Game.css"

class Game extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            message: 'game'
        }
    }
    render() {
        return (
            <div>
                <div className={ss.divdemo} id="divdemo" >
                </div>
            </div>
        )
    }
}

export default Game