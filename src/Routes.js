import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import  Main  from './components/Main';

import Dashboard from './views/Dashboard';
import StopTimeList from "./views/StopTimeList";
import StopTimeLists from "./views/StopTimeLists";
import ToDo from "./views/ToDo";
import Machine from './views/Machine';
import RepairsAdd from "./views/RepairsAdd";

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/dashboard"/>
            <RouteWithLayout exact path="/dashboard" component={Dashboard} layout={Main}/>

            <RouteWithLayout exact path="/stoptimelists" component={StopTimeLists} layout={Main}/>
            <RouteWithLayout exact path="/stoptimelist/:id" component={StopTimeList} layout={Main}/>
            <RouteWithLayout exact path="/todo/:id" component={ToDo} layout={Main}/>
            {/*<RouteWithLayout exact path="/machines" component={Machine} layout={Main}/>*/}
            <RouteWithLayout exact path="/machine/:id" component={Machine} layout={Main}/>   {/*render={(props)=><MachinePage {...props}/>}*/}
            {/*<RouteWithLayout exact path="/repair_add/" component={RepairsAdd} layout={Main}/>   /!*render={(props)=><MachinePage {...props}/>}*!/*/}
            {/*<RouteWithLayout exact path="/machine/repair_add/:id" component={RepairsAdd} layout={Main}/>*/}
            {/*<Route exact path="/sign-in" component={SignInPage}/>*/}
            {/*<Route exact path="/machines" component={MachinesPage}/>*/}
            {/*<Route exact path="/dashboard" component={Dashboard}/>*/}
        </Switch>
    )
};

export default Routes;
