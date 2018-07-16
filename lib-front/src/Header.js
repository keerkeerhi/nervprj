import Nerv from 'nervjs'
import ss from "./Header.css"
import backService from "./service/backService"
import VLink from "./common/VLink"

class Header extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            navs:[]
        }
        this.getNs()
    }

    getNs(){
        backService.getNavs().then(res=>{
            if (res.code==0)
            {
                this.setState({navs:res.info})
            }
        })
    }

    render() {
        let match = this.props.match
        return (

        )
    }

}

export default Header