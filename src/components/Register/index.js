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

export default class Register extends React.Component{
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
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <Card title="欢迎宝贝" bordered={false} style={{marginBottom:'30px',marginTop:'30px'}}>
                            <p>基础表单的测试</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="表单" bordered={false}>
                            <Row>
                                <Col span={6} offset={8}>
                                <Spin tip="拼命注册中" indicator={mySpin} spinning={this.state.loading}>
                                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                                        <FormItem >
                                            <Input prefix={<Icon type="user" />} placeholder="用户名" id="username" name="username" />
                                        </FormItem>
                                        <FormItem >
                                            <Input prefix={<Icon type="phone" />} placeholder="电话" id="mobile" name="mobile" />
                                        </FormItem>
                                        <FormItem >
                                            <DatePicker placeholder="生日" id="birthday" name="birthday" />
                                        </FormItem>
                                        <FormItem >
                                            <Input prefix={<Icon type="heart" />} placeholder="性别" id="sex" name="sex" />
                                        </FormItem>
                                        <FormItem >
                                            <Input prefix={<Icon type="lock" />} placeholder="密码" id="password" name="password" type="password"/>
                                        </FormItem>
                                        <FormItem >
                                            <Button htmlType="submit" type="primary" style={{marginLeft:"40%"}}>注册</Button>
                                        </FormItem>
                                    </Form>
                                    </Spin>
                                </Col>
                            </Row>
                                
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}