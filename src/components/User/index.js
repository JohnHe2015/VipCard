import React from 'react';
import { Table, Row, Col, Card, Spin, Icon} from 'antd';
import axios from './../../axios/axios';

const { Column } = Table;

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
                dataSource : response.data,
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
                        <Card title="用户列表" bordered={false}>
                            <Row>
                                <Col span={24} >
                                    <Table dataSource={this.state.dataSource} rowKey="ID" bordered={true}>
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