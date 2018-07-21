import Nerv from 'nervjs'
import ss from "./NoticeDetail.css"
import backService from "./service/backService"

class NoticeDetail extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: {}
        }
        console.log(this.props)
        let {id} = this.props.match.params
        backService.getNoticeDetail(id).then(res=>{
            if (res.code==0)
            {
                this.setState({data:res.info[0]})
            }
        })
    }
    render() {
        let data = this.state.data
        return (
            <section className={ss.detailPage} >
                <header className={ss.pageHeader}>
                    {data.title}
                </header>
                <div className={ss.pagetime} >{data.createtime}</div>
                <div className={ss.pageimg}>
                    <img src={data.img}>

                    </img>
                </div>
                <pre>
                    {data.content}
                </pre>
            </section>
        )
    }
}

export default NoticeDetail