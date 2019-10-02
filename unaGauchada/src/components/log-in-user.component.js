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

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        axios.post('http://localhost:5000/users/login', user)
            .then(res => console.log(res.data));
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