import Nerv from 'nervjs'
import backService from "../service/backService"
import ss from "./ADDt.css"

class ADetail extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: {}
        }
        let {id} = this.props.match.params
        this.getList(id)
    }

    getList(id){
        backService.getArt(id).then(res=>{
            if (res.code==0)
            {
                this.setState({list:res.info})
            }
        })
    }
    render() {
        let data = this.state.data
        return (
            <div>
                <header>
                    <label>{data.title}</label>
                    <label>{data.createtime}</label>
                </header>
                <pre>
                                {data.content}
                </pre>
            </div>
        )
    }
}

export default ADetail