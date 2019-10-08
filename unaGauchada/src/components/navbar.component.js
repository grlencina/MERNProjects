import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {

    constructor(props){
        super(props);

        this.onClickDone = this.onClickDone.bind(this);
    }

    onClickDone(e){
        axios.get('http://localhost:5000/users/logoff' + localStorage.getItem('token'))
        .then(res => {
            if(res.data.success) {
                    
            } else {
                console.log(res.data.message);
            }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        window.location = "/";
    }

    render() {
        if (localStorage.getItem("token") == null) {
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
                            <li className="navbar-item">
                                <Link to="/users/login" onClick={()=> this.onClickDone()} className="nav-link">Log off</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }
    }
}