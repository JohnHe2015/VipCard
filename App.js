import React from 'react';
//import Clock from './src/components/Clock';
import Header from './src/components/Header';
import Main from './src/components/Main';


class App extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;