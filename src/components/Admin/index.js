import React from 'react';
import Header from './../Header';
import SideBar from './../SideBar';
import ContentBread from './../ContentBread';
import {Row,Col} from 'antd';
import './index.less';

export default class Admin extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <div className="admin-container">
                    <SideBar />
                    <div className="content-container">
                        <Row>
                            <Col span={24}>
                                <ContentBread />
                            </Col>
                        </Row>
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}