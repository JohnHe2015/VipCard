import React from 'react';
import './index.less';
import {Col,Row,Card} from 'antd';
import ContentBread from './../ContentBread';
import Register from './../Register';

class Content extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="content-container">
                <Row>
                    <Col span={24}>
                        <ContentBread />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="欢迎宝贝" bordered={false} style={{marginBottom:'30px',marginTop:'30px'}}>
                            <p>基础表单的测试</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="表单" bordered={false}>
                            <Row>
                                <Col span={6} offset={8}>
                                    <Register />
                                </Col>
                            </Row>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Content;