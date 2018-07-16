import Nerv from 'nervjs'
import { Input,Form,Message } from 'element-react';
import loginstyle from './Login.css'
import homeService from './service/homeService'

class Login extends Nerv.Component {
    constructor(props) {
        super(props);
        this.state = {
            wheight: this.getClientHeight(),
            loginInfo: {
                password: '',
                email: ''
            },
            rules: {
                    email: [{ required: true, message: '请输入用户名', trigger: 'submit' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'submit' }]
                    }
        }
    }
    onChange(key, value) {
        this.setState({
            loginInfo: Object.assign({}, this.state.loginInfo, { [key]: value })
        });
    }
    submitFun(e) {
        homeService.login(this.state.loginInfo).then(res=>{
            if (res.code==0)
            {
                this.props.history.push('/back/banner')
            }
            else
                Message.error(res.info);
        })
    }
    render() {
        return (
            <section style={{height:this.state.wheight+'px'}} className={loginstyle.nervPage}>
                <section className={loginstyle.loginForm}>
                    <div>
                        登录
                    </div>
                    <section>
                        <Input value={this.state.loginInfo.email} placeholder="用户名"
                               onChange={this.onChange.bind(this, 'email')} autoComplete="off" />
                        <Input type="password" value={this.state.loginInfo.password} placeholder="密码"
                               onChange={this.onChange.bind(this, 'password')} autoComplete="off" />
                    </section>
                    <div onClick={this.submitFun.bind(this)} className={loginstyle.subbtn} >
                        登录
                    </div>
                </section>
            </section>
        )
    }
    getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        else {
            var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }
}

export default Login