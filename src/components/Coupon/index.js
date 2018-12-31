import React from 'react';
import { Table, Row, Col, Card, message} from 'antd';
import axios from './../../axios/axios';
import converter from './../../utils/converter'



export default class Coupon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            page : 1,        //分页计算后台node处理
            pageSize: 10,    //一页显示条数
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData =()=>{
        axios.get({
            url : '/coupon/get',
            isShowLoading : true,
            params : {
                page : this.state.page,
                pageSize : this.state.pageSize
            }
        })
        .then((response)=>{
            this.setState({
                dataSource : response.result,
                count : response.count
            })
        })
        .catch((err)=>{
            message.error(err.toString());
            console.log(err)
        })
    }

    changePage = (page,pageSize)=>{
        this.state.page = page;
        this.state.pageSize = pageSize;
        this.getData();
    }
    
    render(){
        const columns = [
            {
                title : "用户名",
                dataIndex : "username",
                key : "username"
            },
            {
                title : "类型",
                dataIndex : "type",
                key : "type",
                render : (type)=>{
                    let result;
                    if(type == "1"){
                        result = "咖啡券";
                    }
                    else if(type == "2"){
                        result = "拍摄券";
                    }
                    else if(type == "3"){
                        result = "摄影券";
                    }
                    return(
                        result
                    )
                }
            },
            {
                title : "折扣",
                dataIndex : "rate",
                key : "rate",
                render : (rate)=>{
                    let result;
                    if(rate == 0){
                        result = "免费";
                    }
                    else{
                        result = parseFloat(rate)*10 + "折";
                    }
                    return(
                        result
                    )
                }
            },
            {
                title : "开始时间",
                dataIndex : "startTime",
                key : "startTime",
                render : (startTime)=>{
                    return(
                        converter.getDate(startTime)
                    )
                }
            },
            {
                title : "截止时间",
                dataIndex : "endTime",
                key : "endTime",
                render : (endTime)=>{
                    return(
                        converter.getDate(endTime)
                    )
                }
            },
            {
                title : "是否使用",
                dataIndex : "isUse",
                key : "isUse",
                render : (isUse)=>{
                    return(
                        isUse == 0 ? "未使用" : "已使用"
                    )
                }
            },
            {
                title : "使用时间",
                dataIndex : "useTime",
                key : "useTime",
                render : (useTime)=>{
                    return(
                        useTime == "-" ? "-" : converter.getFullDate(useTime)
                    )
                }
            }
        ];
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
                                    <Table dataSource={this.state.dataSource} rowKey="key" bordered={true} columns={columns}
                                    pagination={{
                                        pageSize : this.state.pageSize,
                                        current : this.state.page,
                                        // pageSizeOptions : ['5','10','15','20'],
                                        // showSizeChanger :true,
                                        total :this.state.count,
                                        onChange : this.changePage
                                    }}
                                    >
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