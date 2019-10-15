import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

var moment = require('moment');

export default class CreateGauchada extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeExpirationDate = this.onChangeExpirationDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            creationDate: new Date(),
            expirationDate: new Date(),
            owner: '',
            owner_id:'',
            resolver:' '
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')== null){
            window.location= '/';
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });

    }

    onChangeExpirationDate(date) {
        this.setState({
            expirationDate: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let id = axios.get('http://localhost:5000/users/name/'+ localStorage.getItem('username'));

        const gauchada = {
            title: this.state.title,
            description: this.state.description,
            creationDate: this.state.creationDate,
            expirationDate: this.state.expirationDate,
            owner: localStorage.getItem('username'),
            owner_id: id,
            resolver: this.state.resolver
        }

        axios.post('http://localhost:5000/gauchadas/add', gauchada)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3> Create a new Gauchada </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Title </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label> Description </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiration Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.expirationDate}
                                onChange={this.onChangeExpirationDate}
                            />
                        </div>
                    </div>
                    <div className="form-group" disabled>
                        <label>Creation Date: </label>
                        <div>
                            {moment(this.state.creationDate).format('MM-DD-YYYY')}
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Gauchada" className="btn btn-primary" />
                    </div>

                </form>

            </div>
        )
    }

}