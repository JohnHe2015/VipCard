import React from 'react';
import {Card, Form, Input, Button, Col, Row, Icon} from 'antd';
import './index.less';
const FormItem = Form.Item;

export default class Register extends React.Component{
    constructor(props)
    {
        super(props);
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
                                    <Form layout="verctical" >
                                        <FormItem >
                                            <Input prefix={<Icon type="user" />} placeholder="用户名" id="userName" name="userName" />
                                        </FormItem>
                                        <FormItem >
                                            <Input prefix={<Icon type="phone" />} placeholder="电话" id="tel" name="tel" />
                                        </FormItem>
                                        <FormItem >
                                            <Input prefix={<Icon type="star" />} placeholder="生日" id="birthday" name="birthday" />
                                        </FormItem>
                                        <FormItem >
                                            <Input prefix={<Icon type="heart" />} placeholder="性别" id="sex" name="sex" />
                                        </FormItem>
                                        <FormItem >
                                            <Input prefix={<Icon type="lock" />} placeholder="密码" id="password" name="password" />
                                        </FormItem>
                                        <FormItem >
                                            <Button type="primary" style={{marginLeft:"40%"}}>注册</Button>
                                        </FormItem>
                                    </Form>
                                </Col>
                            </Row>
                                
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}