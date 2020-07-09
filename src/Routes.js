import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import  Main  from './components/Main';
import Dashboard from './views/Dashboard';
import StopTimeList from "./views/StopTimeList";
import StopTimeLists from "./views/StopTimeLists";
import ToDo from "./views/ToDo";
import Machine from './views/Machine';
import CrashLists from "./views/CrashLists";
import SignInPage from "./views/SignInPage";
import {AUTH_TOKEN} from "./constants";
import MassMeters from "./views/MassMeters";

function PrivateRoute({ children, ...rest }) {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authToken ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/sign-in",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

const Routes = () => {
    // const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
        <Switch>
            <RouteWithLayout exact path="/sign-in" component={SignInPage} layout={Main}/>
            {/*{authToken ? <Redirect exact from="/" to="/dashboard" /> : <Redirect to="/sign-in" />}*/}
            {/*<Redirect exact from="/" to="/dashboard"/>*/}
            <PrivateRoute path="/">
                <Redirect exact from="/" to="/dashboard"/>
                <RouteWithLayout exact path="/dashboard/" component={Dashboard} layout={Main} />
                <RouteWithLayout exact path="/stoptimelists" component={StopTimeLists} layout={Main}/>
                <RouteWithLayout exact path="/stoptimelist/:id" component={StopTimeList} layout={Main}/>
                <RouteWithLayout exact path="/crashlists" component={CrashLists} layout={Main}/>
                <RouteWithLayout exact path="/todo/:id" component={ToDo} layout={Main}/>
                <RouteWithLayout exact path="/machine/:id" component={Machine} layout={Main}/>
                <RouteWithLayout exact path="/massmeters" component={MassMeters} layout={Main}/>
            </PrivateRoute>

            {/*<RouteWithLayout exact path="/dashboard" component={Dashboard} layout={Main}/>*/}

            {/*<RouteWithLayout exact path="/stoptimelists" component={StopTimeLists} layout={Main}/>*/}
            {/*<RouteWithLayout exact path="/stoptimelist/:id" component={StopTimeList} layout={Main}/>*/}
            {/*<RouteWithLayout exact path="/crashlists" component={CrashLists} layout={Main}/>*/}
            {/*<RouteWithLayout exact path="/todo/:id" component={ToDo} layout={Main}/>*/}
            {/*<RouteWithLayout exact path="/machines" component={Machine} layout={Main}/>*/}
            {/*<RouteWithLayout exact path="/machine/:id" component={Machine} layout={Main}/>   /!*render={(props)=><MachinePage {...props}/>}*!/*/}
            {/*<RouteWithLayout exact path="/repair_add/" component={RepairsAdd} layout={Main}/>   /!*render={(props)=><MachinePage {...props}/>}*!/*/}
            {/*<RouteWithLayout exact path="/machine/repair_add/:id" component={RepairsAdd} layout={Main}/>*/}
            {/*<RouteWithLayout exact path="/sign-in" component={SignInPage} layout={Main}/>*/}
            {/*<Route exact path="/machines" component={MachinesPage}/>*/}
            {/*<Route exact path="/dashboard" component={Dashboard}/>*/}
        </Switch>
    )
};

export default Routes;
