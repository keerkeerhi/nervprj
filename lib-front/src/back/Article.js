import Nerv from 'nervjs'
import {Button,Dialog,Input,Switch,Message,Tree} from "element-react"
import backService from "../service/backService"
import ss from './Article.css'

class Game extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tree: [],
            options: {
                children: 'child',
                label: 'title'
            },
            list: [],
            showAdd: false,
            data:{sort:0},
            cNavId:""
        }
        this.getTree()
    }
    getTree(){
        backService.getAll().then(res=>{
            if (res.code==0)
            {
                let t1 = res.info
                let tree = this.initTree(t1)
                this.setState({tree})
            }
        })
    }
    initTree(list){
        let map = {}
        let res = []
        list.forEach(it=>{
            if (it.pid==-1)
            {
                it.child = []
                map[it.id] = it
                res.push(it)
            }
        })
        list.forEach(it=>{
            if (it.pid in map)
                map[it.pid].child.push(it)
        })
        return res;
    }
    newArt(){
        this.setState({ showAdd: true, data:{sort:0}})
    }
    onChange(key, value) {
        this.setState({
            data: Object.assign({}, this.state.data, { [key]: value })
        });
    }
    areaChange(key,e)
    {
        let {value} = e.target
        this.setState({
            data: Object.assign({}, this.state.data, { [key]: value })
        });
    }
    svAr(){
        let data = this.state.data
        data.createtime = Date.now()
        data.navid = this.state.cNavId
        backService.saveArt(data).then(res=>{
            if (res.code==0){
                this.getList(data.navid)
                this.setState({ showAdd: false, data:{sort:0}})
                Message({
                    message: '保存成功！',
                    type: 'success'
                });
            }
        })
    }
    cancle(){
        this.setState({ showAdd: false, data:{sort:0}})
    }
    getList(id){
        backService.getArt(id).then(res=>{
            if (res.code==0){
                this.setState({list:res.info,cNavId:id})
            }
        })
    }
    delArt(id){
        backService.delArt(id).then(res=>{
            if (res.code==0)
            {
                this.getList(this.state.cNavId)
                Message({
                    message: '已删除！',
                    type: 'success'
                });
            }
        })
    }
    render() {
        return (
            <section className={ss.page} >
                <section className={ss.pageContent} >
                    <div>
                        <div className={ss.tthead} >
                            <label>请选择导航</label>
                        </div>
                        <Tree
                            defaultExpandAll={true}
                            data={this.state.tree}
                            options={this.state.options}
                            highlightCurrent={true}
                            onNodeClicked={(data, reactElement,)=>{
                                this.getList(data.id)
                                console.debug('onNodeClicked: ', data, reactElement)
                            }}
                        />
                    </div>
                    <section>
                        <header className={ss.aHead}>
                            <Button onClick={this.newArt.bind(this)}>新建文章</Button>
                        </header>
                        <table className={ss.aTable} >
                            <tr>
                                <td>标题</td>
                                <td>内容</td>
                                <td>创建时间</td>
                                <td>操作</td>
                            </tr>
                            {
                                this.state.list.map(it=>(
                                    <tr>
                                        <td>{it.title}</td>
                                        <td>{it.content}</td>
                                        <td>{it.createtime}</td>
                                        <td>
                                            <Button onClick={this.delArt.bind(this,it.id)} >删除</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </section>
                </section>

                {/*弹框*/}
                <Dialog
                    title="写文章"
                    visible={ this.state.showAdd }
                    onCancel={ () => this.setState({ showAdd: false }) }
                >
                    <Dialog.Body>
                        {this.state.showAdd && (
                            <section>
                                <div className={ss.formItem} >
                                    <label>标题</label>
                                    <Input value={this.state.data.title} onChange={this.onChange.bind(this, 'title')}></Input>
                                </div>
                                <div className={ss.formItem2} >
                                    <label>文章内容</label>
                                    <textarea value={this.state.data.content}
                                              rows="8" cols="20"
                                           onChange={this.areaChange.bind(this, 'content')}></textarea>
                                </div>
                                <div className={ss.formItem} >
                                    <label>顺序</label>
                                    <Input value={this.state.data.sort} placeholder="输入数字"
                                           onChange={this.onChange.bind(this, 'sort')}></Input>
                                </div>
                                <div className={ss.formItem} >
                                    <Button onClick={this.svAr.bind(this)} >
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