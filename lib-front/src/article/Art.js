import Nerv from 'nervjs'
import { Route } from "react-router-dom";
import {Message} from "element-react"
import backService from "../service/backService"
import ss from "./Art.css"
import VLink from "../common/AVLink"
import ADetail from './ADetail'
import ADList from './ADList'

class Art extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.initFun(this.props.match)
    }
    initFun(){
        this.state = {
            list: [],
            aList: []
        }
        let {params} = this.props.match
        this.getCNav(params.id)
    }
    componentWillReceiveProps(np){
        let {id} = this.props.match.params
        let {id:nid} = np.match.params
        if (id!=nid)
        {
            this.props = np;
            this.initFun()
        }
    }
    getCNav(id){
        let match = this.props.match
        backService.getCNav(id).then(res=>{
            if (res.code==0)
            {
                this.setState({list:res.info})
                if (res.info.length>0)
                {
                    let {id} = res.info[0]
                    this.props.history.push(`${match.url}/list/${id}`)
                }
            }
            else{
                Message.error("获取数据超时！");
            }
        })
    }
    render() {
        let match = this.props.match
        return (
            <section>
                <header className={ss.header} ></header>
                <section className={ss.cont} >
                    <section className={ss.cct} >
                        <ul className={ss.nav} >
                            {
                                this.state.list.map(it=>(
                                    <li>
                                        <VLink to={`${match.url}/list/${it.id}`} label={it.title} />
                                    </li>
                                ))
                            }
                        </ul>
                        <div className={ss.rightContent} >
                            <Route path={`${match.url}/list/:id`} component={ADList} />
                            <Route path={`${match.url}/detail/:nid`} component={ADetail} />
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}

export default Art