import axios from 'axios';
const myAxios = {
    get : (options)=>{
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