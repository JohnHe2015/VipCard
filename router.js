 import React from 'react';
 import {HashRouter , Switch, Route} from 'react-router-dom';
 import Admin from './src/components/Admin';
 import Register from './src/components/Register';
 import NoMatch from './src/components/Page404';
 import App from './App';

 export default class IRouter extends React.Component{
     render(){
         return(
             <HashRouter>
                 <App>
                     <Switch>
                        <Route path="/admin" render={()=>
                            <Admin>
                                <Route path="/admin/pass" component={Register} />
                                <Route  component={NoMatch} />
                            </Admin>
                        } />
                        
                     </Switch>
                 </App>
             </HashRouter>
         );
     }
 }
