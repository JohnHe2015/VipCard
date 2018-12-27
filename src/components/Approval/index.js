import React from 'react';
import { Table, Row, Col, Card, Modal, Button, InputNumber, Spin, Select, message, Icon} from 'antd';
import './index.less';
import axios from './../../axios/axios';
import Converter from './../../utils/converter';

const confirm = Modal.confirm;

message.config({
    top: 200,
    duration: 3,
    maxCount: 3,
  });
const success = (string)=>{
    message.success(string);
}
const error = (string)=>{
    message.error(string);
}


export default class Approval extends React.Component{
    constructor(props){
        super(props);
        

    this.state = {
            dataSource : [],
            visible : false,
        }
    }

    columns = [
        {
            title:"用户名",
            dataIndex:"username",
            key:"username"
        },
        {
            title:"电话号码",
            dataIndex:"mobile",
            key:"mobile"
        },
        {
            title:"性别",
            dataIndex:"sex",
            key:"sex"
        },
        {
            title:"生日",
            dataIndex:"birthday",
            key:"birthday"
        },
        {
            title:"申请时间",
            dataIndex:"createTime",
            key:"createTime"
        },
        {
            title:"操作",
            dataIndex:"operation",
            key:"operation",
            render: (text, record,index) => (
                <div className="opera">
                    <span onClick={this.showModal.bind(this,record)}>
                        <Icon type='edit' />通过
                    </span>
                    <span> | </span>
                    <span onClick={this.showCancel.bind(this,(record.ID))}>
                        <Icon type='close-circle' />拒绝
                    </span>
                {this.renderAction(record)}
                </div>
                
            )
        }
    ]; 
    
    renderAction =(record) =>{
        record.visible = record.visible == true ? true:false;
        return(
                <Modal 
                    title="请输入消费金额和拍摄类型 :"
                    visible={record.visible}
                    destroyOnClose={true}
                    key={record.ID}
                    onOk={() => this.handleOk(record)}
                    onCancel={()=>this.handleCancel(record)}>
                    <InputNumber style={{marginLeft:100,width:130,marginBottom:10}} placeholder="请输入金额" id="amount" name="amount" defaultValue={0}
                    formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\¥\s?|(,*)/g, '')}/>
                    <br />
                    <Select placeholder="请选择类型" style={{width:130,marginLeft:100}}>
                        <Select.Option value="1">全家福</Select.Option>
                        <Select.Option value="2">婚纱</Select.Option>
                        <Select.Option value="3">企业</Select.Option>
                        <Select.Option value="4">个人</Select.Option>
                        <Select.Option value="5">其它</Select.Option>
                    </Select>
                </Modal>
            ) 
    }

    delData =(ID)=>{
        axios.post({
            url :'/user/deltemp',
            data :{
                ID : ID
            }
        })
        .then((response)=>{
            if(response.data == "OK")
            {
                this.getData();
                success('删除成功');
            }
        })
        .catch((err)=>{
            error(err);
            console.log(err);
        });
    }

    showCancel= (ID)=> {
        confirm({
          title: '审批?',
          content: 'Hi，确定要不通过吗？',
          onOk : ()=>{
            this.delData(ID);
          },
          onCancel: ()=> {},
        });
      }


    showModal=(record)=>{
        record.visible = true;
        this.setState({
            visible: true,
        });
    }

    handleOk=(data)=>{
        let amount = document.getElementById('amount').value;
        amount = Converter.string2Amt(amount);
        let level = amount < 30000? 1 : 2;   //1普通会员  2Vip会员
        axios.post({
            url : '/user/post',
            data : {
                ID : data.ID,
                username : data.username,
                password : data.password,
                birthday : data.birthday,
                sex : data.sex,
                level : level,
                mobile : data.mobile,
            },
            isShowLoading : true
        })
        .then((response)=>{
            if(response.data == "OK")
            {
                this.delData(data.ID);         
                data.amount = amount;    //把消费金额传递给setCoupleData
                this.setCoupleData(data);
                success("恭喜您，用户已审核通过！");
            }
        })
        .catch((err)=>{
            console.log(err);
            error("审核失败！请联系管理员");
        });
        
      }
    
      handleCancel=(record)=>{
        record.visible = record.visible == true? false : true;
        this.setState({
            visible : true
        })
      }

    componentDidMount(){
        this.getData();
    }

    getData =()=>{
        axios.get({
            url : '/user/gettemp',
            isShowLoading : true
        })
        .then((response)=>{
           this.setState({
            dataSource :response.data,
           })
        })
        .catch((err)=>{
            console.log(err);
            error(err);
        });
    }

    setCoupleData =(data)=>{
        let now = Converter.getTime();
        axios.post({
            url : '/coupon/post',
            data : {
                ID : data.ID,
                username : data.username,
                startTime : now,
                endTime : (now/1000+(60*60*24*30))*1000,     //加上一个月的时间
                isUse : 0,                                  //0代表未使用
                useTime : "-",
                amount : data.amount
            }
        })
        .then((response)=>{
            if(response.data == "OK")
            {
                success("优惠券已发放到账户！");
            }
        })
        .catch((err)=>{
            error("优惠券发放失败！请联系管理员");
            console.log(err);
        });
    }

    
    render(){
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <Card title="欢迎宝贝" bordered={false} style={{marginBottom:'30px',marginTop:'30px'}}>
                            <p>这里是用户的注册审核</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="审核" bordered={false}>
                            <Row>
                                <Col span={24} >
                                    <Table className="Approval-table" dataSource={this.state.dataSource} rowKey="ID" columns={this.columns} bordered={true}>
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