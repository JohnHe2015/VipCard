import React from 'react';
import { Table, Row, Col, Card, Modal, Button, InputNumber, Input, Select} from 'antd';
import axios from 'axios';

const { Column } = Table;
const confirm = Modal.confirm;


export default class Approval extends React.Component{
    constructor(props){
        super(props);
        

    this.state = {
            dataSource : [],
            ModalText : "Content of Modal",
            visible : false,
            confirmLoading: false, 
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
            title:"操作",
            dataIndex:"operation",
            key:"operation",
            render: (text, record,index) => (
                <span>
                <Button type="primary" onClick={this.showModal.bind(this,record)} style={{marginRight:20}}>
                    同意
                </Button>
                {this.renderAction(record)}
                <Button onClick={this.showCancel.bind(this,(record.ID))}>
                    不同意
                </Button>
                </span>
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
                    confirmLoading={this.state.confirmLoading}
                    onCancel={()=>this.handleCancel(record)}>
                    <InputNumber  style={{marginLeft:100,width:130,marginBottom:10}} placeholder="请输入金额" id="amount" name="amount" defaultValue={0}
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
        axios.post('http://localhost:8081/user/deltemp',{
            ID : ID
        })
        .then((response)=>{
            if(response.data == "OK")
            {
                this.getData();
            }
        })
        .catch((err)=>{
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

    handleOk=(json)=>{
        console.log("come in ");
        console.log(json);
        let amount = document.getElementById('amount').value;
        console.log(amount);
 
        // setTimeout(() => {
        //   this.setState({
        //     visible: false,
        //     confirmLoading: false,
        //   });
        // }, 1000);
        
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
        axios.get('http://localhost:8081/user/gettemp',{
        })
        .then((response)=>{
           this.setState({
            dataSource :response.data
           })
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
                            <p>这里是用户的注册审核</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="审核" bordered={false}>
                            <Row>
                                <Col span={24} >
                                    <Table dataSource={this.state.dataSource} rowKey="ID" columns={this.columns} bordered={true}>
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