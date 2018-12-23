import React from 'react';
import {Card, Form, Input, Button, Col, Row, Icon, DatePicker, message, Spin} from 'antd';
import './index.less';
import axios from 'axios';
const FormItem = Form.Item;
message.config({
    top: 200,
    duration: 3,
    maxCount: 3,
  });

const mySpin = <Icon type="sync" spin />
const success = ()=>{
    message.success('注册成功，请等待顾问审核');
}
const fail = ()=>{
    message.fail('很抱歉,注册失败！');
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
        axios.post('http://67.218.137.208:8081/user/posttemp',{
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            mobile: document.getElementById('mobile').value,
            sex: document.getElementById('sex').value,
            birthday: document.getElementById('birthday').children[0].children[0].value
     
        })
        .then((response)=>{
            this.setState({
                loading : false
            })
            if(response.data == "OK")
            {
                success();
            }
            else
            {
                fail();
            }
        })
        .catch((err)=>{
            console.log(err);
        });
      }

    render(){
        const {getFieldDecorator} = this.props.form;
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
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                    <Input prefix={<Icon type="user" style={{color:"#655747"}} />} placeholder="用户名"  />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    <Input prefix={<Icon type="phone" style={{color:"#655747"}} />} placeholder="电话" id="mobile" name="mobile" />
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    <DatePicker placeholder="生日" style={{marginRight:"55%"}} />
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    <Input prefix={<Icon type="heart" style={{color:"#655747"}} />} placeholder="性别" id="sex" name="sex" />
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    <Input prefix={<Icon type="lock" style={{color:"#655747"}} />} placeholder="密码" id="password" name="password" type="password"/>
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
const MRegister = Form.create()(Register);

export default MRegister;