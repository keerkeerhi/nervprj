import Nerv from 'nervjs'
import Swiper from 'swiper'
import ss from "./Inx.css"
import homeService from "./service/homeService"
import backService from "./service/backService"

class Inx extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            message: 'w bu hao',
            banners: [],
            navs:[]
        }
        this.getBs()
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
            <section style={{height:windowH+'px'}} className={ss.banner}>
                <div className='swiper-container'>
                    <div className='swiper-wrapper'>
                        {
                            this.state.banners.map(it=>(
                                <div style={{background: "url('"+ it.url +"') no-repeat",
                                    height:windowH+'px'
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