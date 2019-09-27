import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component";
import ViewUserProfile from "./components/view-user-profile.component";
import GauchadasList from "./components/gauchadas-list.component";
import CreateGauchada from "./components/create-gauchada.component";
import CreateUser from "./components/create-user.component"


function App() {
    return (
        <div className="container">
            <Router>
                <Navbar/>
                <br/>
                <Route path="/" exact component={GauchadasList} />
                <Route path="/view/:id" component={ViewUserProfile} />
                <Route path="/create" component={CreateGauchada} />
                <Route path="/users/signUp" component={CreateUser} />
                {/*<Route path="" component={} />
                <Route path="" component={} />
                <Route path="" component={} />*/}
            </Router>
        </div>
  );
}

export default App;
