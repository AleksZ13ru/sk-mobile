import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Routes from "./Routes";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
    return (
        <div className="App">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Router>
                    <Routes/>
                </Router>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default App;
