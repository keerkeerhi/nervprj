/**
 * Created by Administrator on 2017/12/20.
 */
import axios from 'axios';
import {baseURL} from '../common/globalConfig';
// import {fGetRandom} from '../common/Util'

export default {
    saveBanner(params){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'banner',params)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getBanners(){
        return new Promise((resolve,reject)=>{
            axios.get(baseURL + 'banner')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    hidebanner(params){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'hidebanner',params)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    delbanner(id){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'del_banner',{id})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    saveNav(params){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'nav',params)
                .then((response) => {
                    resolve(response.data);
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getNavs(){
        return new Promise((resolve,reject)=>{
            axios.get(baseURL + 'nav')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getCNav(id){
        return new Promise((resolve,reject)=>{
            axios.get(baseURL + 'getCNav?id='+id)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    delNav(id){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'del_nav',{id})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getAll(){
        return new Promise((resolve,reject)=>{
            axios.get(baseURL + 'getAll')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getArt(id){
        return new Promise((resolve,reject)=>{
            axios.get(baseURL + 'getArt?id='+id)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getArtDetail(id){
        return new Promise((resolve,reject)=>{
            axios.get(baseURL + 'article/'+id)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    saveArt(params){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'article',params)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    delArt(id){
        return new Promise((resolve,reject)=>{
            axios.post(baseURL + 'del_art',{id})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
}