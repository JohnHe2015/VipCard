import React from 'react';
import { Table, Row, Col, Card} from 'antd';
import axios from 'axios';

const { Column } = Table;


export default class Coupon extends React.Component{
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
        axios.get('http://localhost:8081/coupon/get',{
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
                            <p>这里是优惠券管理</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="优惠券列表" bordered={false}>
                            <Row>
                                <Col span={24} >
                                    <Table dataSource={this.state.dataSource} rowKey="key" bordered={true}>
                                        <Column
                                            title="用户名"
                                            dataIndex="username"
                                            key="username"
                                            />
                                        <Column
                                            title="类型"
                                            dataIndex="type"
                                            key="type"
                                        />
                                        <Column
                                            title="折扣"
                                            dataIndex="rate"
                                            key="rate"
                                        />
                                        <Column
                                            title="开始时间"
                                            dataIndex="startTime"
                                            key="startTime"
                                        />
                                        <Column
                                            title="截止时间"
                                            dataIndex="endTime"
                                            key="endTime"
                                        />
                                        <Column
                                            title="是否使用"
                                            dataIndex="isUse"
                                            key="isUse"
                                        />
                                        <Column
                                            title="使用时间"
                                            dataIndex="useTime"
                                            key="useTime"
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