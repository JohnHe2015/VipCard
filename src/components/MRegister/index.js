import React from 'react';
import './index.less';
import axios from './../../axios/axios';
import {message,Icon,Card,Spin,Row} from 'antd';
import BaseForm from './../BaseForm/index';
message.config({
    top: 200,
    duration: 3,
    maxCount: 3,
  });

const mySpin = <Icon type="sync" spin />
const success = (str)=>{
    message.success(str);
}
const error = (str)=>{
    message.error(str);
}
export default class MRegister extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            loading : false
        }
    }

    handleSubmit=(data)=> {
        console.log('fuck');
        //e.preventDefault();
        data({ force: true }, (err, values) => {
            if(err)
            {
                return;
            }
            this.setState({
                loading : true
            })
            
            // let values= this.props.form.getFieldsValue();
            values.birthday = values.birthday.format('YYYY-MM-DD');  
            console.log(values);
            axios.post({
                url : '/user/posttemp',
                data : values
             })
            .then((response)=>{
                this.setState({
                    loading : false
                })
                if(response.status == "200")
                {
                    success('注册成功，请等待顾问审核');
                }
                else
                {
                    error(response.data);
                }
            })
            .catch((err)=>{
                this.setState({
                    loading : false
                })
                console.log(err);
                error(`出错了 : ${err} !`);
            });
        });
      }

    render(){
        const formList = [
            { 
                type: "input",
                label: "备注",
                initialValue: "初始值测试",
                placeholder: "请填写你的备注",
                // width: "200px",
                fieldName:"username",
            },
            {
                type: "select",
                label: "下拉框",
                fieldName:"test2",
                placeholder:"请选择类型",
                optionList : [
                    {
                        name : "1",
                        value : "摄影券"
                    },
                    {
                        name : "2",
                        value : "咖啡券"
                    }
                ]
            },
            {
                type:"date",
                label:"生日",
                fieldName:"birthday",
                placeholder:"请选择日期"
            },
            {
                type:"button",
                btnValue:"提交",
                btnType:"primary",
                fieldName :"submit"
            }
        ]

        return (
            <BaseForm formList={formList} handleSubmit={this.handleSubmit} />
        )
    }
}



