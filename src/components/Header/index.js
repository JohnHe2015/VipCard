import React from 'react';
import './index.less';
import {Col,Row,Icon,Avatar,Badge,Dropdown,Menu} from 'antd';

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">个人信息</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">系统设置</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">退出登录</a>
      </Menu.Item>
    </Menu>
  );

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    

    render(){
        return(
            <div className="header-container">
                <Row>
                    <Col span={4}>
                        <div className="logo">
                            <img src="/assets/logo.png" alt="谬诗"></img>
                        </div>
                    </Col>
                    <Col span={20}>
                        <div className="header-right">
                            <ul>
                                <li><a><Icon type="mail" /></a></li>
                                <li><a><Icon type="qrcode" /></a></li>
                                <li>
                                    <Dropdown overlay={menu} placement="bottomCenter">
                                        <Badge count={66}><Avatar style={{ backgroundColor: '#87d068' }}>郑舒茜</Avatar></Badge>
                                    </Dropdown>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Header;