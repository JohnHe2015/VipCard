import React from 'react';
import {Card, Form, Input, Button, Col, Row, Icon, DatePicker, message, Select} from 'antd';
import './index.less';
import axios from './../../axios/axios';
const FormItem = Form.Item;
message.config({
    top: 200,
    duration: 3,
    maxCount: 3,
  });

const success = (str)=>{
    message.success(str);
}
const error = (str)=>{
    message.error(str);
}

class Register extends React.Component{
    constructor(props)
    {
        super(props);
    }

    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err, values) => {
            if(err)
            {
                return;
            }
            // let values= this.props.form.getFieldsValue();
            values.birthday = values.birthday.format('YYYY-MM-DD');  
            axios.post({
                url : '/user/posttemp',
                data : values,
                // isShowLoading : true
             })
            .then((response)=>{
                success(response);
            })
            .catch((err)=>{
                console.log(err);
                error(`出错了 : ${err} !`);
            });
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
                    <Row>
                        <Card id="register-card" title="注册" bordered={false} style={{textAlign:"center"}}>
                        <span className="register-span">MUSEE FOTO会员注册</span>
                            <Form layout="vertical" onSubmit={this.handleSubmit}>
                                <FormItem {...formItemLayout} >
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名!'},
                                                {pattern: new RegExp(/^[0-9a-zA-Z-_]+$/, "g"), message: '用户名只能为数字字母或下划线的组合！'},
                                                {max:14, min: 6, message:'用户名长度为6-14位'}
                                            ],
                                    })(
                                    <Input prefix={<Icon type="user" style={{color:"#655747"}} />} placeholder="用户名"  />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('mobile', {
                                        rules: [{ required: true, message: '请输入手机号!' },
                                                {max:11, min: 8, message:'电话长度为8-11位'}
                                    ],
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
                                        rules: [{ required: true, message: '请输入性别!' },
                                                {max:3, min:1, message:'性别长度为1-3位'}
                                        ],
                                    })(
                                        <Select placeholder="请选择性别" >
                                            <Select.Option value={1}>男</Select.Option>
                                            <Select.Option value={2}>女</Select.Option>
                                        </Select>
                                        // <Input prefix={<Icon type="heart" style={{color:"#655747"}} />} placeholder="性别" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('password',{
                                        rules: [{ required: true, message: '请输入密码!' },
                                                {pattern: new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/), message:'密码长度为6-16位且不能为纯数字或英文'}
                                    ],
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
            </div>
        )
    }
}
export default Form.create()(Register);