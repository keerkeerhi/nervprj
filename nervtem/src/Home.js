import Nerv from 'nervjs'

class Home extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            message: 'world'
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

export default Home