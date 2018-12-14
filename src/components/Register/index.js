import React from 'react';
import {Form, Input, Button, Checkbox, message,Icon} from 'antd';
import './index.less';
const FormItem = Form.Item;

export default class Register extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
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
        )
    }
}