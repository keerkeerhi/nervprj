import Nerv from 'nervjs'
import backService from "../service/backService"
import ss from "./ADList.css"

class ADetail extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            list: [],
            detailPath: ''
        }
        let {id} = this.props.match.params
        this.getList(id)
    }

    componentWillReceiveProps(np){
        let {id} = this.props.match.params
        let {id:nid} = np.match.params
        if (id!=nid)
        {
            this.props = np;
            this.getList(nid)
        }
    }

    getList(id){
        let match = this.props.match
        console.log(match)
        let urlstr = match.url
        let durl = urlstr.substring(0,urlstr.lastIndexOf('/')).replace('list','')
        backService.getArt(id).then(res=>{
            if (res.code==0)
            {
                if (res.info.length==1)
                {
                    let id = res.info[0].id
                    this.props.history.push(`${durl}detail/${id}`)
                }
                else
                    this.setState({list:res.info,detailPath:durl})
            }
        })
    }

    render() {
        return (
            <div className={ss.page} >
                <header className={ss.arhead}>
                    <label>文章列表</label>
                </header>
                {
                    this.state.list.length==0?(
                        <div>暂无文章数据</div>
                    ):(
                        <ul className={ss.artit} >
                            {
                                this.state.list.map(it=>(
                                    <li onClick={()=>{
                                        let url = this.state.detailPath
                                        let id = it.id
                                        this.props.history.push(`${url}detail/${id}`)
                                    }} >
                                        <label>{it.title}</label>
                                        <label>{it.createtime}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        )
    }
}

export default ADetail