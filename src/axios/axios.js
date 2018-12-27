import axios from 'axios';
const myAxios = {
    get : (options)=>{
        let loading;
        console.log(options.isShowLoading);
        if (options && options.isShowLoading){
            console.log('come in ');
            loading = document.getElementById('myLoading');
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
                    loading = document.getElementById('myLoading');
                    loading.style.display = 'none';
                }
                if(response.status =="200")
                {
                    resolve(response);
                }
            })
            .catch((error)=>{
                reject(error);
            })
        })
    },

    post : (options)=>{
        let loading;
        if (options && options.isShowLoading){
            loading = document.getElementById('myLoading');
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
                    loading = document.getElementById('myLoading');
                    loading.style.display = 'none';
                }
                if(response.status =="200")
                {
                    resolve(response);
                }
            })
            .catch((error)=>{
                reject(error);
            })
        })
    }
};

export default myAxios;