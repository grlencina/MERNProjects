import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        if (localStorage.getItem("user_id") == null) {
            console.log(localStorage.getItem("user_id"));
            return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">Una Gauchada</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/users/signup" className="nav-link">Sign up</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/users/login" className="nav-link">Log in</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
           
        } else {
            console.log(localStorage.getItem("user_id"));
            return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">Una Gauchada</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Gauchadas dashboard</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/gauchadas/create" className="nav-link">Create Gauchada</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/users/view/:id" className="nav-link">My profile</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }
    }
}