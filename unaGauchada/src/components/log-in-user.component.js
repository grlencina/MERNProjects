import React, { Component } from 'react';
import axios from 'axios';

export default class LogInUser extends Component {


    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    setUserData(data) {
        localStorage.setItem('token', data._id);
        localStorage.setItem('username', data.username);
        console.log(data);
        window.location ="/";
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                if(res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', user.username);
                    window.location = "/";          
                } else {
                    console.log(res.data.message);
                }
            });
    }

    render() {
        return (
            <div>
                <h3> Log in </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <label> Password: </label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />

                        <div className="form-group">
                            <input type="submit" value="Log me in!" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}