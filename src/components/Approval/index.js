import React from 'react';
import { Table, Row, Col, Card, Modal, Button, InputNumber, Icon, Select} from 'antd';
import axios from 'axios';

const { Column } = Table;
const confirm = Modal.confirm;


export default class Approval extends React.Component{
    constructor(props){
        super(props);
        

    this.state = {
            isDel : false,
            dataSource : [],
            ModalText : "Content of Modal",
            visible : false,
            confirmLoading: false,
            delData : this.delData.bind(this),
            getData : this.getData.bind(this),
            columns : [
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
                    render: (text, record) => (
                        <span>
                        <Button type="primary" onClick={this.showModal.bind(this)} style={{marginRight:20}}>
                            同意
                        </Button>
                        <Modal 
                            title="请输入消费金额和拍摄类型 :"
                            visible={this.state.visible}
                            onOk={this.handleOk.bind(this)}
                            confirmLoading={this.state.confirmLoading}
                            onCancel={this.handleCancel.bind(this)}>
                            <InputNumber  style={{marginLeft:100,width:130,marginBottom:10}} placeholder="请输入金额" id="amount" name="amount" defaultValue={0}
                            formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\¥\s?|(,*)/g, '')}/>
                            <br />
                            <Select placeholder="请选择类型" style={{width:130,marginLeft:100}}>
                                <Option value="1">全家福</Option>
                                <Option value="2">婚纱</Option>
                                <Option value="3">企业</Option>
                                <Option value="4">个人</Option>
                                <Option value="5">其它</Option>
                            </Select>
                        </Modal>
                        <Button onClick={this.showCancel.bind(this,(record.ID))}>
                            不同意
                        </Button>
                        </span>
                    )
                }
            ]   
        }
    }
    delData =(ID)=>{
        console.log(ID);
        axios.post('http://localhost:8081/user/deltemp',{
            ID : ID
        })
        .then((response)=>{
            if(response.data == "OK")
            {
                this.state.getData();
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
            this.state.delData(ID);
          },
          onCancel: ()=> {},
        });
      }


    showModal(){
        this.setState({
            visible: true,
        });
    }

    handleOk(){
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      }
    
      handleCancel(){
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      }

    componentDidMount(){
        this.getData();
    }

    getData (){
        axios.get('http://localhost:8081/user/gettemp',{
        })
        .then((response)=>{
           this.setState({
            dataSource :response.data
           })
        //    console.log(dataSource);
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
                                    <Table dataSource={this.state.dataSource} rowKey="ID" columns={this.state.columns} bordered={true}>
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