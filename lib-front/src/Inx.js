import Nerv from 'nervjs'
import Swiper from 'swiper'
import { Link } from "react-router-dom";
import ss from "./Inx.css"
import homeService from "./service/homeService"
import backService from "./service/backService"

class Inx extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            message: 'w bu hao',
            banners: [],
            navs:[],
            notices1:[],
            notices2:[]
        }
        this.getBs()
        this.getNotice()
    }
    getNotice(){
        backService.indexPage().then(res=>{
            if (res.code==0)
            {
                let notices1 = []
                let notices2 = []
                let i = 0;
                let list = res.info
                while(list.length>0)
                {
                    if (i<3){
                        notices1.push(list.pop())
                    }
                    else
                    {
                        notices2.push(list.pop())
                    }
                    i++
                }
                console.log('22==<',notices2)
                this.setState({notices1,notices2})
            }
        })
    }

    getBs(){
        backService.getBanners().then(res=>{
            if(res.code==0)
            {
                this.setState({banners:res.info})
            }
        })
    }

    render() {
        let windowH = this.getClientHeight();
        return (
            <section>
                <section style={{height:windowH+'px'}} className={ss.banner}>
                    <div className='swiper-container'>
                        <div className='swiper-wrapper'>
                            {
                                this.state.banners.map(it=>(
                                    <div style={{background: "url('"+ it.url +"') no-repeat",
                                        height:windowH+'px',
                                        backgroundSize: "100% 100%",
                                        backgroundPosition: "center"
                                    }}
                                         className='swiper-slide'>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-scrollbar"></div>
                    </div>
                </section>
                <section className={ss.newscont} >
                    <header className={ss.newsHeader} >
                        <h4>公告</h4>
                        <div>图书馆公告及活动</div>
                    </header>
                    <section className={ss.newss} >
                        <section className={ss.newsImgs} >
                            <div style={{position:"relative"}} className='noticesw-container'>
                                <div className='swiper-wrapper'>
                                    {
                                        this.state.notices1.map(it=>(
                                            <Link to={`/index/noticeDetail/${it.id}`} style={{background: "url('"+ it.img +"') no-repeat",
                                                height:'300px',
                                                backgroundSize: "auto 100%",
                                                backgroundPosition: "center",
                                                position:"relative",
                                                cursor: "pointer"
                                            }}
                                                  className='swiper-slide'>
                                                <div className={ss.newsTit} >
                                                    <label>{it.title}</label>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                                {/*<div class="swiper-pagination"></div>*/}
                            </div>
                        </section>
                        <ul className={ss.nsUl} >
                            {
                                this.state.notices2.length>0?(
                                    this.state.notices2.map(it=>(
                                        <Link to={`/index/noticeDetail/${it.id}`}>
                                            <label>{it.title}</label>
                                            <label>{it.createtime}</label>
                                        </Link>
                                    ))
                                ):(
                                    <div className={ss.nonotice} >
                                        暂无资讯
                                    </div>
                                )
                            }
                        </ul>
                    </section>
                </section>
            </section>
        )
    }

    componentDidMount(){
        console.log('-----didmount')
        let mySwiper = new Swiper('.swiper-container', {
            autoplay:{
                delay: 3500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        })

        let swiper = new Swiper('.noticesw-container', {
            autoplay:{
                delay: 3500,
                disableOnInteraction: false,
            },
            effect:"fade",
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            // pagination: {
            //     el: '.swiper-pagination',
            // },
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

}

export default Inx