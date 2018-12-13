import React from 'react';
import './index.css';
import {Button} from 'antd';

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date : new Date()};
    }
    count(){
        this.setState({
            date : new Date()
        });
    }
    componentDidMount()
    {
        this.timer = 
            setInterval(()=>{
                this.count();
            },1000)
        }
    
    componentWillUnmount(){
        clearInterval(this.timer);
    }


    render(){
        return(
            <div className="clock">
                <Button>Hello World</Button>
                <div>
                    {this.state.date.toLocaleTimeString()}
                </div>
            </div>
        )
    }
}

export default Clock;