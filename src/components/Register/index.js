import React from 'react';
import {Card, Form, Input, Button, Col, Row, Icon, DatePicker, message, Spin} from 'antd';
import './index.less';
import axios from './../../axios/axios';
const FormItem = Form.Item;
message.config({
    top: 200,
    duration: 3,
    maxCount: 3,
  });

const mySpin = <Icon type="sync" spin />
const success = (str)=>{
    message.success(str);
}
const fail = (str)=>{
    message.fail(str);
}

class Register extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            loading : false
        }
    }
    handleSubmit=(e)=> {
        e.preventDefault();
        this.setState({
            loading : true
        })
        let values= this.props.form.getFieldsValue();
        values.birthday = values.birthday.format('YYYY-MM-DD');  
        axios.post({
            url : '/user/posttemp',
            data : values
         })
        .then((response)=>{
            this.setState({
                loading : false
            })
            if(response.data == "OK")
            {
                success('注册成功，请等待顾问审核');
            }
            else
            {
                fail('注册失败！');
            }
        })
        .catch((err)=>{
            console.log(err);
        });
      }

    render(){
        const {getFieldDecorator} = this.props.form;
        //定义手机和电脑的适配,不考虑平板
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 8 ,offset : 8},
            },
          };
        return(
            <div id="register-wrapper">
                <Spin tip="拼命注册中" indicator={mySpin} spinning={this.state.loading}>
                    <Row>
                        <Card id="register-card" title="注册" bordered={false} style={{textAlign:"center"}}>
                        <span className="register-span">MUSEE FOTO会员注册</span>
                            <Form layout="vertical" onSubmit={this.handleSubmit}>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                    <Input prefix={<Icon type="user" style={{color:"#655747"}} />} placeholder="用户名"  />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('mobile', {
                                        rules: [{ required: true, message: '请输入手机号!' }],
                                    })(
                                    <Input prefix={<Icon type="phone" style={{color:"#655747"}} />} placeholder="电话"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('birthday',{
                                        rules: [{ required: true, message: '请输入生日!' }],
                                    })(
                                        <DatePicker format="YYYY-MM-DD" placeholder="生日" style={{marginRight:"55%"}} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('sex',{
                                        rules: [{ required: true, message: '请输入性别!' }],
                                    })(
                                        <Input prefix={<Icon type="heart" style={{color:"#655747"}} />} placeholder="性别" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('password',{
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color:"#655747"}} />} placeholder="密码" id="password" name="password" type="password"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    <Button htmlType="submit" type="primary" >注册</Button>
                                </FormItem>
                            </Form>      
                        </Card>
                    </Row>
                </Spin>
            </div>
        )
    }
}
export default Form.create()(Register);