import React from 'react';
import './index.less';
import {Col,Row} from 'antd';

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="header-container">
                <Row>
                    <Col span={24}>fisrt column</Col>
                </Row>
            </div>
        )
    }
}

export default Header;