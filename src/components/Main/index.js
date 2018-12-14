import React from 'react';
import {Row,Col} from 'antd';
import SideBar from './../SideBar';
import Content from './../Content';
import './index.less';

class Main extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
            <div className="main-container">
                <SideBar />
                <Content />
            </div>
        )
    }
}
export default Main;