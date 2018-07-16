import Nerv from 'nervjs'
import { Route } from "react-router-dom";
import ss from "./Home.css"
import backService from "./service/backService"
import VLink from "./common/IVLink"
import Inx from "./Inx"
import Art from "./article/Art"

class Home extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            navs:[]
        }
        this.getNs()
    }

    getNs(){
        backService.getNavs().then(res=>{
            if (res.code==0)
            {
                this.setState({navs:res.info})
            }
        })
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
    render() {
        let windowH = this.getClientHeight();
        let match = this.props.match
        return (
            <div className={ss.container}>
                <header className={ss.indexheader} >
                    <img style="visibility: hidden;" src="" />
                    <ul className={ss.headernav} >
                        <li>
                            <VLink to={`${match.url}/home`} label="首页" />
                        </li>
                        {
                            this.state.navs.map(it=>(
                                <li>
                                    <VLink to={`${match.url}/art/${it.id}`} label={it.title} />
                                </li>
                            ))
                        }
                    </ul>
                </header>
                <div style={{height:windowH+'px'}} >
                    <Route path={`${match.url}/home`} component={Inx} />
                    <Route path={`${match.url}/art/:id`} component={Art} />
                </div>
                <footer className={ss.footer} >
                    <header>
                        <div className={ss.link} >
                            友情链接：
                            <a href="http://wz321.net/" target="_blank" >网址321</a>
                        </div>
                    </header>
                    <div>
                        <div>© Copyright - ICP备XXX号 - 大玉软件</div>
                        <div>联系电话：6226520</div>
                    </div>
                </footer>
            </div>
        )
    }

}

export default Home