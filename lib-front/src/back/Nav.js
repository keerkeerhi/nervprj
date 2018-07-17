import Nerv from 'nervjs'
import {Button,Dialog,Input,Switch,Message} from "element-react"
import backService from "../service/backService"
import ss from "./Nav.css"

class Game extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showAdd: false,
            title: "添加首页导航",
            data:{isshow: 1,sort:0,pid:-1},
            list:[],
            list2:[],
            cinx: -1
        }
        this.getList()
    }
    getList(){
        backService.getNavs().then(res=>{
            if (res.code==0)
            {
                this.setState({list:res.info})
                if (res.info.length>0)
                {
                    this.setState({cinx:0})
                    this.getCNav(res.info[0].id)
                }
            }
            else{
                Message.error("获取数据超时！");
            }
        })
    }
    getCNav(id){
        backService.getCNav(id).then(res=>{
            if (res.code==0)
            {
                this.setState({list2:res.info})
            }
            else{
                Message.error("获取数据超时！");
            }
        })
    }
    addNav(){
        this.setState({ showAdd: true,title: "添加首页导航", data:{isshow: 1,sort:0,pid:-1}})
    }
    addCNav(){
        let {cinx,list} = this.state
        if (cinx>-1)
        {
            this.setState({ showAdd: true,title: "添加子目录", data:{isshow: 1,sort:0,pid:list[cinx].id}})
        }
        else
            Message({
                message: '请在左侧选择要添加在哪个首页导航',
                type: 'warning'
            });

    }
    delNav(id,e){
        backService.delNav(id).then(res=>{
            if (res.code==0)
            {
                this.getList()
                Message({
                    message: '已删除！',
                    type: 'success'
                });
            }
        })
    }
    delcNav(id,e){
        let {cinx,list} = this.state
        backService.delbanner(id).then(res=>{
            if (res.code==0)
            {
                if (cinx>-1)
                    this.getCNav(list[cinx].id)
                Message({
                    message: '已删除！',
                    type: 'success'
                });
            }
        })
    }
    svNav(){
        let data = this.state.data
        backService.saveNav(this.state.data).then(res=>{
            if (res.code==0){
                if (data.pid>-1)
                {
                    this.getCNav(data.pid)
                }
                else
                    this.getList()
                this.setState({ showAdd: false, data:{isshow: 1,sort:0,pid:-1}})
                Message({
                    message: '保存成功！',
                    type: 'success'
                });
            }
        })
    }
    cancle(){
        this.setState({ showAdd: false, data:{isshow: 1,sort:0}})
    }
    onChange(key, value) {
        this.setState({
            data: Object.assign({}, this.state.data, { [key]: value })
        });
    }
    render() {
        return (
            <section className={ss.page} >
                <section className={ss.pageContent} >
                    <div className={ss.left}>
                        <header>
                            <div onClick={this.addNav.bind(this)}>添加首页导航</div>
                        </header>
                        <ul className={ss.leftul} >
                            {
                                this.state.list.map((it,inx)=>(
                                    <li className={this.state.cinx==inx?ss.lactive:''} onClick={()=>{
                                        this.setState({cinx:inx})
                                        this.getCNav(it.id)
                                    }}>
                                        <label>{it.title}</label>
                                        <label onClick={this.delNav.bind(this,it.id)}>删除</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={ss.right} >
                        <header>
                            <div onClick={this.addCNav.bind(this)}>添加子目录</div>
                        </header>
                        <ul className={ss.rightul} >
                            {
                                this.state.list2.map(it=>(
                                    <li>
                                        <label>{it.title}</label>
                                        <div>
                                            <label onClick={this.delcNav.bind(this,it.id)}>删除</label>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </section>
                {/*弹框*/}
                <Dialog
                    title={this.state.title}
                    visible={ this.state.showAdd }
                    onCancel={ () => this.setState({ showAdd: false }) }
                >
                    <Dialog.Body>
                        {this.state.showAdd && (
                            <section>
                                <div className={ss.formItem} >
                                    <label>名称</label>
                                    <Input value={this.state.data.title} onChange={this.onChange.bind(this, 'title')}></Input>
                                </div>
                                <div className={ss.formItem} >
                                    <label>顺序</label>
                                    <Input value={this.state.data.sort} placeholder="输入数字"
                                           onChange={this.onChange.bind(this, 'sort')}></Input>
                                </div>
                                <div className={ss.formItem} >
                                    <label>是否显示</label>
                                    <Switch
                                        onText=""
                                        offText=""
                                        onValue={1}
                                        offValue={0}
                                        value={this.state.data.isshow}
                                        onChange={this.onChange.bind(this, 'isshow')}
                                    />
                                </div>
                                <div className={ss.formItem} >
                                    <Button onClick={this.svNav.bind(this)} >
                                        保存
                                    </Button>
                                    <Button onClick={this.cancle.bind(this)} >
                                        取消
                                    </Button>
                                </div>
                            </section>
                        )}
                    </Dialog.Body>
                </Dialog>
            </section>
        )
    }
}

export default Game