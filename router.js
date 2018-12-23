 import React from 'react';
 import {HashRouter , Switch, Route} from 'react-router-dom';
 import Admin from './src/components/Admin';
 import MRegister from './src/components/Register';
 import User from './src/components/User';
 import Approval from './src/components/Approval';
 import Coupon from './src/components/Coupon';
 import NoMatch from './src/components/Page404';
 import App from './App';

 export default class IRouter extends React.Component{
     render(){
         return(
             <HashRouter>
                 <App>
                     <Route exact={true} path="/register" component={MRegister}/>
                     <Switch>
                        <Route path="/admin" render={()=>
                            <Admin>
                                <Switch>
                                    <Route exact={true} path="/admin/register" component={MRegister} />
                                    <Route exact={true} path="/admin/manager" component={User} />
                                    <Route exact={true} path="/admin/approval" component={Approval} />
                                    <Route exact={true} path="/admin/coupon" component={Coupon} />
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
