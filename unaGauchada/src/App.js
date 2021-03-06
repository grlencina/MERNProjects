import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component";
import ViewUserProfile from "./components/view-user-profile.component";
import GauchadasList from "./components/gauchadas-list.component";
import CreateGauchada from "./components/create-gauchada.component";
import CreateUser from "./components/create-user.component";
import ViewGauchada from "./components/view-gauchada.component";
import EditGauchada from "./components/edit-gauchada.component";
import LogInUser from "./components/log-in-user.component";
//import LogOffUser from "./components/log-off-user.component";

function App() {
    return (
        <div className="container">
            <Router>
                <Navbar/>
                <br/>
                <Route path="/" exact component={GauchadasList} />
                <Route path="/users/view/:id" component={ViewUserProfile} />
                <Route path="/users/signup" component={CreateUser} />
                <Route path="/users/login" component={LogInUser} />
                {/*<Route path="/users/logoff" component={LogOffUser} />*/}
                <Route path="/gauchadas/create" component={CreateGauchada} />
                <Route path="/gauchadas/view/:id" component={ViewGauchada} />
                <Route path="/gauchadas/edit/:id" component={EditGauchada} />
                {/*<Route path="" component={} />
                <Route path="" component={} />
                <Route path="" component={} />*/}
            </Router>
        </div>
  );
}

export default App;
