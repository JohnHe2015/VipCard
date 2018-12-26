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

    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err, values) => {
            if(err)
            {
                return;
            }
            this.setState({
                loading : true
            })
            // let values= this.props.form.getFieldsValue();
            values.birthday = values.birthday.format('YYYY-MM-DD');  
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
        const formList = [{ 
            type: "input",
            lable: "备注",
            initialValue: "oncare",
            placeholder: "请填写你的备注",
            width: "200px",
            field:"text",
            }
        ]

        return (
            <BaseForm formList={formList} handleSubmit={this.handleSubmit} />
        )
    }
}



