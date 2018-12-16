import React from 'react';
import { Table, Row, Col, Card} from 'antd';
import axios from 'axios';

const { Column } = Table;

var data ;


export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : []
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData (){
        axios.get('http://localhost:8081/user/get',{
        })
        .then((response)=>{
           this.setState({
            dataSource :response.data
           })
           //console.log(dataSource);
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
                            <p>这里是用户的管理</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="表单" bordered={false}>
                            <Row>
                                <Col span={24} >
                                    <Table dataSource={this.state.dataSource} rowKey="ID">
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