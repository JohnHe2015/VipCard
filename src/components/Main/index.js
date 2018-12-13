import React from 'react';
import {Row,Col} from 'antd';
import './index.css';

class Main extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
            <div className="main-container">
                <Row>
                    <Col span={6}>sidebar</Col>
                    <Col span={18}>content</Col>
                </Row>
            </div>
        )
    }
}
export default Main;