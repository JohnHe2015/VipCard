import axios from 'axios';
const myAxios = {
    get : (options)=>{
        let loading = document.getElementById('myLoading');
        if (options && options.isShowLoading){
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                //baseURL : 'http://47.98.138.190:8081/',
                baseURL : 'http://localhost:8081/',
                url : options.url,
                method : options.method || 'get',
                params : options.params || {},
                timeout : 5000,
            })
            .then((response)=>{
                if (options && options.isShowLoading !== false) {
                    loading.style.display = 'none';
                }
                if(response.status =="200")
                {
                    resolve(response);
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
                //baseURL : 'http://47.98.138.190:8081/',
                baseURL : 'http://localhost:8081/',
                url : options.url,
                method : options.method || 'post',
                data : options.data || {},
                timeout : 8000,
            })
            .then((response)=>{
                if (options && options.isShowLoading !== false) {
                    loading.style.display = 'none';
                }
                if(response.status =="200")
                {
                    resolve(response);
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