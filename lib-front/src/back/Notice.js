import Nerv from 'nervjs'

class Game extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            message: 'notice'
        }
    }
    render() {
        return (
            <div>
                Hello, {this.state.message}
            </div>
        )
    }
}

export default Game