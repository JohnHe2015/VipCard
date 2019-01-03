import axios from 'axios';
import {message}  from 'antd';
const myAxios = {
    get : (options)=>{
        let loading = document.getElementById('myLoading');
        if (options && options.isShowLoading){
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                baseURL : 'http://api.zhengshuqian.com/',
                //baseURL : 'http://localhost/',
                url : options.url,
                method : options.method || 'get',
                params : options.params || {},
                timeout : 5000,
            })
            .then((response)=>{
                if (options && options.isShowLoading !== false) {
                    loading.style.display = 'none';
                }
                if(response.status =="200" && response.data.errcode == "0" )
                {
                    resolve(response.data);
                }
                if(response.data.errcode == "400")
                {
                    message.error(response.data.errmsg);
                }
            })
            .catch((error)=>{
                loading.style.display = 'none';
                reject(error);
            })
        })
    },

    post : (options)=>{
        let loading = document.getElementById('myLoading');
        if (options && options.isShowLoading){
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                baseURL : 'http://api.zhengshuqian.com/',
                //baseURL : 'http://localhost/',
                url : options.url,
                method : options.method || 'post',
                data : options.data || {},
                timeout : 8000,
            })
            .then((response)=>{
                if (options && options.isShowLoading !== false) {
                    loading.style.display = 'none';
                }
                console.log(response);
                if(response.status =="200" && response.data.errcode == "0")
                {
                    resolve(response.data.errmsg);
                }
                if(response.data.errcode == "400")
                {
                    message.error(response.data.errmsg);
                }
            })
            .catch((error)=>{
                loading.style.display = 'none';
                reject(error);
            })
        })
    }
};

export default myAxios;