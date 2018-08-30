import Nerv from 'nervjs'
import ss from "./AddArticle.css"
import {Button,Input,Message} from "element-react"
import wangEditor from 'wangeditor'
import {baseURL} from '../common/globalConfig'
import backService from '../service/backService'


class AddArticle extends Nerv.Component {
    constructor(props) {
        super(...arguments);
        console.log(props)
        this.state = {
            data:{sort:0},
            editorContent: '',
            cNavId: props.match.params.id
        }
    }
    saveArticle(){
        let data = this.state.data
        data.createtime = Date.now()
        data.navid = this.state.cNavId
        data.content = this.state.editorContent
        backService.saveArt(data).then(res=>{
            if (res.code==0){
                this.props.history.push('/back/Article')
                Message({
                    message: '保存成功！',
                    type: 'success'
                });
            }
        })
    }
    onChange(key, value) {
        this.setState({
            data: Object.assign({}, this.state.data, { [key]: value })
        });
    }
    componentDidMount(){
        let E = wangEditor
        let editor = new E('#editor')
        editor.customConfig.uploadImgServer = baseURL+'/upload'
        editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
        editor.customConfig.uploadFileName = 'image'
        editor.customConfig.onchange = html => {
            console.log('---html',html)
            this.setState({
                editorContent: html
            })
        }
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                console.log('before')
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                console.log('success')
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                console.log('fail')
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                console.log('error')
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                console.log('timeout')
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                var url = result.url
                insertImg(url)
                console.log('custom',result)
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                // var url = result.url
                // insertImg(url)

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }
        editor.create()
    }
    render() {
        return (
            <section className={ss.page} >
                <h1>添加文章</h1>
                <section className={ss.formContent} >
                    <div className={ss.formItem} >
                        <label>标题</label>
                        <Input value={this.state.data.title} onChange={this.onChange.bind(this, 'title')}></Input>
                    </div>
                    <div className={ss.formItem} >
                        <label>顺序</label>
                        <Input value={this.state.data.sort} placeholder="输入数字"
                               onChange={this.onChange.bind(this, 'sort')}></Input>
                    </div>
                    <div className={ss.formItem2} >
                        <label>文章内容</label>
                        <div id="editor">
                            <p> <b>在此编辑内容</b></p>
                        </div>
                    </div>
                    <div className={ss.formItem} >
                        <Button className={ss.saveBtn} onClick={this.saveArticle.bind(this)} >
                            保存
                        </Button>
                        <Button onClick={()=>this.props.history.push('/back/Article')} >
                            取消
                        </Button>
                    </div>
                </section>
            </section>
        )
    }
}

export default AddArticle