import Nerv from 'nervjs'
import {Button,Dialog,Input,Switch,Message} from "element-react"
import backService from "../service/backService"
import ss from "./Banner.css"

class Banner extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showAdd: false,
            data:{
                isshow: 1,
                sort:0
            },
            list:[],
            image: null
        }
        this.getList()
    }
    getList(){
        backService.getBanners().then(res=>{
            if(res.code==0){
                this.setState({list:res.info})
            }
            else
                Message.error("获取数据超时！");
        })
    }
    addBanner(){
        let banner = this.state.data
        let file = this.state.image
        let fd = new FormData()
        if (file)
            fd.append('image', file, file.name);
        for (let par in banner)
            fd.append(par, banner[par])
        backService.saveBanner(fd).then(res=>{
            if (res.code==0){
                this.setState({ showAdd: false, data:{isshow: 1,sort:0},image: null})
                this.getList()
                Message({
                    message: '保存成功！',
                    type: 'success'
                });
            }
            else
            {
                Message({
                    message: res.info,
                    type: 'success'
                });
            }
        })
    }
    cancle(){
        this.setState({ showAdd: false, data:{isshow: 1,sort:0},image: null})
    }
    onChange(key, value) {
        this.setState({
            data: Object.assign({}, this.state.data, { [key]: value })
        });
    }

    ichange(e) {
        let ipt = e.target
        let img = ipt.files[0]
        if (!img)
            return
        if (img.size > 5242880) {
            Message.error("上传图片不能超过5M");
            return
        }
        ipt.value = ""
        let reader = new FileReader()
        reader.onload = (e) => {
            let src = e.target.result
            this.setState({image:img})
            document.getElementById('headerImg').src = src;
        }
        reader.readAsDataURL(img)
    }
    hidebanner(it,e){
        let {id,isshow} = it
        backService.hidebanner({id,isshow:Number(!isshow)}).then(res=>{
            if (res.code==0)
            {
                this.getList()
                Message({
                    message: '操作成功！',
                    type: 'success'
                });
            }
        })
    }
    delbanner(id,e){
        backService.delbanner(id).then(res=>{
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
    render() {
        return (
            <section className={ss.page} >
                <section className={ss.pageContent} >
                    <header className={ss.head}>
                        <Button onClick={()=>this.setState({ showAdd: true })}>添加</Button>
                    </header>
                    <table className={ss.bannerTable} >
                        <tr>
                            <td>顺序编号</td>
                            <td>图片</td>
                            <td>描述</td>
                            <td>显示</td>
                            <td>操作</td>
                        </tr>
                        {
                            this.state.list.map((it)=>(
                                <tr>
                                    <td>{it.sort}</td>
                                    <td><img src={it.url} /></td>
                                    <td>{it.remark}</td>
                                    <td><Button onClick={this.hidebanner.bind(this,it)}>{it.isshow==1?"隐藏":"显示"}</Button></td>
                                    <td><Button onClick={this.delbanner.bind(this,it.id)} >删除</Button></td>
                                </tr>
                            ))
                        }
                    </table>
                </section>

                {/*弹框*/}
                <Dialog
                    title="添加轮播图片"
                    visible={ this.state.showAdd }
                    onCancel={ () => this.setState({ showAdd: false }) }
                >
                    <Dialog.Body>
                        {this.state.showAdd && (
                            <section>
                                <div className={ss.imageItem} >
                                    <img id="headerImg" src={this.state.data.url} />
                                    <Button className={ss.imgBtn} >添加图片
                                        <input onChange={this.ichange.bind(this)} className={ss.finput} type="file" />
                                    </Button>
                                </div>
                                <div className={ss.formItem} >
                                    <label>描述</label>
                                    <Input value={this.state.data.remark} onChange={this.onChange.bind(this, 'remark')}></Input>
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
                                    <Button onClick={this.addBanner.bind(this)} >
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

export default Banner