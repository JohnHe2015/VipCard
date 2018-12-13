import React from 'react';
import './index.css';

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
                <p>Hello World</p>
                <div>
                    {this.state.date.toLocaleTimeString()}
                </div>
            </div>
        )
    }
}

export default Clock;