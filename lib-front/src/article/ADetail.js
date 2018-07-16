import Nerv from 'nervjs'
import backService from "../service/backService"
import { Route } from "react-router-dom";
import ss from "./ADetail.css"

class ADetail extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: {}
        }
        let {nid} = this.props.match.params
        this.getList(nid)
    }
    getList(id){
        backService.getArtDetail(id).then(res=>{
            if (res.code==0)
            {
                this.setState({data:res.info[0]})
            }
        })
    }
    render() {
        return (
            <section>
                <header className={ss.header} >{this.state.data.title}</header>
                <div className={ss.time}>{this.state.data.createtime}</div>
                <section className={ss.content} >
                    <pre>
                        {this.state.data.content}
                    </pre>
                </section>
            </section>
        )
    }
}

export default ADetail