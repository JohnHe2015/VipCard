import React from 'react';
import './src/style/common.less';    //全局引入默认样式



class App extends React.Component{
    render(){
        return(
            <div style={{height:"100%"}}>
                {this.props.children}
            </div>
        );
    }
}

export default App;