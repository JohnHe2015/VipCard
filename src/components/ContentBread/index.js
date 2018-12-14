import React from 'react';
import './index.less';
import { Breadcrumb, Row, Col} from 'antd';

class ContentBread extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Row>
                    <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">首页</Breadcrumb.Item>
                        <Breadcrumb.Item >用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item >会员审批</Breadcrumb.Item>
                        <Breadcrumb.Item>某应用</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ContentBread;