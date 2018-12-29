import React from 'react';
import { Table, Row, Col, Card, Input, Select, DatePicker, Icon, Button, Tooltip, Form} from 'antd';
import axios from './../../axios/axios';
import converter from './../../utils/converter'
const FormItem = Form.Item;
const { Column } = Table;
import moment from 'moment';

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            page : 1,        //分页计算后台node处理
            pageSize: 8,    //一页显示条数
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData (){
        let formData = this.formRef.getItemsValue();  //获取子Form的数据
        let birthday;
        // this.props.getFormRef(this.formRef.getItemsValue());
        if(formData.birthday)
        {
            birthday = moment(formData.birthday).format('YYYY-MM-DD');
        }
        axios.get({
            url : '/user/get',
            isShowLoading : true,
            params : {
                page : this.state.page,
                pageSize : this.state.pageSize,
                username : formData.username || null,
                mobile : formData.mobile || null,
                sex : formData.sex || null,
                level : formData.level || null,
                birthday : birthday || null
            }
        })
        .then((response)=>{
            this.setState({
                dataSource : response.result,
                count : response.count
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    changePage = (page,pageSize)=>{
        this.state.page = page;
        this.state.pageSize = pageSize;
        this.getData();
    }

    resetFields =()=>{
        this.formRef.resetForm();   //调用子Form实例的resetForm方法清空表单
        this.getData();    
    }
    
    render(){
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <Card title="欢迎宝贝" bordered={false} style={{marginBottom:'30px',marginTop:'30px'}}>
                            <p>这里是用户的管理</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title={
                            <UserForm wrappedComponentRef={(form) => this.formRef = form} />
                            }
                            extra={
                                <span>
                                    <Tooltip placement="top" title="查询">
                                        <Button onClick={()=>this.getData()} type="primary" shape="circle" icon="search" style={{marginRight:20}} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="重置">
                                        <Button onClick={()=>this.resetFields()} type="primary" shape="circle" icon="reload" />
                                    </Tooltip>
                                </span>
                            } 
                            bordered={false}>
                            <Row>
                                <Col span={24} >
                                    <Table dataSource={this.state.dataSource} rowKey="id" bordered={true} 
                                        pagination={{
                                            pageSize : this.state.pageSize,
                                            current : this.state.page,
                                            // pageSizeOptions : ['5','10','15','20'],
                                            // showSizeChanger :true,
                                            total :this.state.count,
                                            onChange : this.changePage
                                        }}
                                        onRow={(record)=>{
                                            record.sex == "1" ? record.sex="男" : record.sex="女"
                                            record.level == "1" ? record.level="Musee会员" : record.level="Vip会员"
                                            record.createTime = converter.getFullDate(record.createTime)
                                            return {
                                                //onClick: () => {console.log(record)},   //此处添加事件
                                            };
                                        }}
                                    >
                                        <Column
                                            title="用户名"
                                            dataIndex="username"
                                            key="username"
                                            />
                                        <Column
                                            title="电话号码"
                                            dataIndex="mobile"
                                            key="mobile"
                                        />
                                        <Column
                                            title="性别"
                                            dataIndex="sex"
                                            key="sex"
                                        />
                                        <Column
                                            title="生日"
                                            dataIndex="birthday"
                                            key="birthday"
                                        />
                                        <Column
                                            title="会员等级"
                                            dataIndex="level"
                                            key="level"
                                        />
                                        <Column
                                            title="注册日期"
                                            dataIndex="createTime"
                                            key="createTime"
                                        />

                                    </Table>
                                </Col>
                            </Row>   
                        </Card>
                    </Col>
                </Row>
            </div>

        ); 
    }
}


class UserForm extends React.Component{
    constructor(props){
        super(props);
    }
    getItemsValue = ()=>{    
        const values= this.props.form.getFieldsValue();
        return values;
    }
    resetForm = ()=>{
        const values = this.props.form.resetFields();
        return values;
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form layout="inline">
                <FormItem>
                    {getFieldDecorator('username', {
                    
                    })(
                    <Input prefix={<Icon type="user" style={{color:"#655747"}} />} placeholder="输入用户名" style={{width:130,marginRight:20}} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('mobile', {
                        
                    })(
                        <Input prefix={<Icon type="phone" style={{color:"#655747"}} />} placeholder="请输入手机号" style={{width:180,marginRight:20}} />
                    )}        
                </FormItem>
                <FormItem>
                    {getFieldDecorator('sex', {
                        
                    })(
                        <Select placeholder="请选择性别" style={{width:120,marginRight:20}}>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="2">女</Select.Option>
                        </Select>
                    )}        
                </FormItem>
                <FormItem>
                    {getFieldDecorator('level', {
                        
                    })(
                        <Select placeholder="会员等级" style={{width:130,marginRight:20}}>
                            <Select.Option value="1">Musee会员</Select.Option>
                            <Select.Option value="2">Vip会员</Select.Option>
                        </Select>
                    )}        
                </FormItem>
                <FormItem>
                    {getFieldDecorator('birthday', {
                        
                    })(
                        <DatePicker format="YYYY-MM-DD" allowClear={false} placeholder="选择生日" style={{marginRight:20}} />
                    )}          
                </FormItem>              
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm);