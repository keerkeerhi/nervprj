/**
 * Created by Administrator on 2017/12/20.
 */
import axios from 'axios';
import {baseURL} from '../common/globalConfig';
// import {fGetRandom} from '../common/Util'

export default {
    login(params){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'login',params)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
}