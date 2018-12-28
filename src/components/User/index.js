import React from 'react';
import { Table, Row, Col, Card, Input, Select, DatePicker, Icon, Button, Tooltip} from 'antd';
import axios from './../../axios/axios';

const { Column } = Table;
const Search = Input.Search;

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData (){
        axios.get({
            url : '/user/get',
            isShowLoading : true
        })
        .then((response)=>{
            this.setState({
                dataSource : response,
            })
        })
        .catch((err)=>{
            console.log(err);
        })
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
                            <span>
                                <Input prefix={<Icon type="user" style={{color:"#655747"}} />} placeholder="输入用户名" style={{width:130,marginRight:20}} />
                                <Input prefix={<Icon type="phone" style={{color:"#655747"}} />} placeholder="请输入手机号" style={{width:180,marginRight:20}} />
                                <Select placeholder="请选择性别" style={{width:120,marginRight:20}}>
                                    <Select.Option value="1">男</Select.Option>
                                    <Select.Option value="2">女</Select.Option>
                                </Select>
                                <Select placeholder="会员等级" style={{width:130,marginRight:20}}>
                                    <Select.Option value="1">Musee会员</Select.Option>
                                    <Select.Option value="2">Vip会员</Select.Option>
                                </Select>
                                <DatePicker format="YYYY-MM-DD" placeholder="选择生日" style={{marginRight:20}} />
                            </span>
                            }
                            extra={
                                <span>
                                    <Tooltip placement="top" title="查询">
                                        <Button type="primary" shape="circle" icon="search" style={{marginRight:20}} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="重置">
                                        <Button type="primary" shape="circle" icon="reload" />
                                    </Tooltip>
                                </span>
                            } 
                            bordered={false}>
                            <Row>
                                <Col span={24} >
                                    <Table dataSource={this.state.dataSource} rowKey="id" bordered={true} >
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