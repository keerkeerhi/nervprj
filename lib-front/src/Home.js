import Nerv from 'nervjs'
import Swiper from 'swiper'
import ss from "./Home.css"

class Home extends Nerv.Component {
    constructor() {
        super(...arguments);
        this.state = {
            message: 'w bu hao',
            banners: [
            {img:"/assets/img/back1.jpg"},
            {img:"/assets/img/back2.jpg"},
            {img:"/assets/img/back3.jpg"},
            {img:"/assets/img/back4.jpg"}
            ]
        }
    }

    render() {
        let windowH = this.getClientHeight();
        return (
            <div style={{height:windowH+'px'}} className='banner'>
                <div className='swiper-container'>
                    <div className={ss.wrapper + ' swiper-wrapper'}>
                        {
                            this.state.banners.map(it=>(
                                // style={{background: "url('"+ it.img +"') no-repeat"}}
                                <div  className='swiper-slide'>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        let mySwiper = new Swiper('.swiper-container', {
            direction:'horizontal',
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
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

}

export default Home