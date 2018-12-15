 import React from 'react';
 import {HashRouter , Switch, Route} from 'react-router-dom';
 import Admin from './src/components/Admin';
 import Register from './src/components/Register';
 import User from './src/components/User';
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
                                <Switch>
                                    <Route exact={true} path="/admin/register" component={Register} />
                                    <Route exact={true} path="/admin/manager" component={User} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                        
                     </Switch>
                 </App>
             </HashRouter>
         );
     }
 }
