import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {


    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        axios.post('http://localhost:5000/users/signUp', user)
            .then(res => console.log(res.data));

        console.log(user);
    }

    render() {
        return (
            <div>
                <h3> Create a new user </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <div className="form-group">
                            <input type="submit" value="Sign me up!" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}