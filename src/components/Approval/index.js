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
                    <span onClick={this.showCancel.bind(this,(record.id))}>
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
                    key={record.id}
                    onOk={() => this.handleOk(record)}
                    onCancel={()=>this.handleCancel(record)}>
                    <InputNumber style={{marginLeft:100,width:130,marginBottom:10}} placeholder="请输入金额" id="amount" name="amount" defaultValue={0}
                    formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\¥\s?|(,*)/g, '')}/>
                    <br />
                    <Select placeholder="请选择类型" style={{width:130,marginLeft:100}}>
                        <Select.Option value={1}>全家福</Select.Option>
                        <Select.Option value={2}>婚纱</Select.Option>
                        <Select.Option value={3}>企业</Select.Option>
                        <Select.Option value={4}>个人</Select.Option>
                        <Select.Option value={5}>其它</Select.Option>
                    </Select>
                </Modal>
            ) 
    }

    delData =(id)=>{
        axios.post({
            url :'/user/deltemp',
            data :{
                id : id
            }
        })
        .then((response)=>{
            this.getData();
        })
        .catch((err)=>{
            error(err);
            console.log(err);
        });
    }

    showCancel= (id)=> {
        confirm({
          title: '审批?',
          content: 'Hi，确定要不通过吗？',
          onOk : ()=>{
            this.delData(id);
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
                id : data.id,
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
            this.delData(data.id);         
            data.amount = amount;    //把消费金额传递给setCoupleData
            this.setCoupleData(data);
            this.sendTemplate(data.id,level);  //最后给微信发送模版消息
            success(response);
            
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
            dataSource :response.result
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
                id : data.id,
                username : data.username,
                startTime : now,
                endTime : (now/1000+(60*60*24*30))*1000,     //加上一个月的时间
                isUse : 0,                                  //0代表未使用
                useTime : "-",
                amount : data.amount
            }
        })
        .then((response)=>{
            success(response);
        })
        .catch((err)=>{
            error("优惠券发放失败！请联系管理员");
            console.log(err);
        });
    }

    sendTemplate =(id,level)=>{      //给微信发送优惠券消息
        console.log(`level is  ${level}`); 
        let type1="咖啡券",type2="拍摄券",type3="摄影券",type1Sum,type2Sum,type3Sum;
        if(level == 1){
            type1Sum = 2;
            type2Sum = 0;
            type3Sum = 0;
        }
        else
        {
            type1Sum = 6;
            type2Sum = 1;
            type3Sum = 2;
        }
        console.log(`typeSum : ${type3Sum}`);
        axios.get({
            url : '/wx/sendTemplate',
            params : {
                id : id,
                level : level,
                type1 : type1,
                type2 : type2,
                type3 : type3,
                type1Sum : type1Sum,
                type2Sum : type2Sum,
                type3Sum : type3Sum,
            }
        })
        .then((response)=>{
           console.log('发送微信消息成功啦');
        })
        .catch((err)=>{
            console.log(err);
            error(err);
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
                                    <Table locale={{emptyText:'宝贝,没数据哦'}} className="Approval-table" dataSource={this.state.dataSource} rowKey="id" columns={this.columns} bordered={true}>
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