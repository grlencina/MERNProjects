import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component";
import ViewUserProfile from "./components/view-user-profile.component";
import GauchadasList from "./components/gauchadas-list.component";
import CreateGauchada from "./components/create-gauchada.component";
import CreateUser from "./components/create-user.component"
import ViewGauchada from "./components/view-gauchada.component"


function App() {
    return (
        <div className="container">
            <Router>
                <Navbar/>
                <br/>
                <Route path="/" exact component={GauchadasList} />
                <Route path="/users/view/:id" component={ViewUserProfile} />
                <Route path="/users/signUp" component={CreateUser} />
                <Route path="/gauchadas/create" component={CreateGauchada} />
                <Route path="/gauchadas/view" component={ViewGauchada} />
                {/*<Route path="" component={} />
                <Route path="" component={} />
                <Route path="" component={} />*/}
            </Router>
        </div>
  );
}

export default App;
