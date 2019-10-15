import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

var moment = require('moment');

export default class EditGauchada extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeExpirationDate = this.onChangeExpirationDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            title: '',
            description: '',
            creationDate: new Date(),
            expirationDate: new Date(),
            owner: 'Site',
            resolver: ' '
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/gauchadas/' + this.props.match.params.id)
            .then(response => {
                if(localStorage.getItem('username')!== response.data.owner){
                    window.location= '/';
                } else {               
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        creationDate: new Date(response.data.creationDate),
                        expirationDate: new Date(response.data.expirationDate),
                        owner: response.data.owner,
                        resolver: response.data.resolver
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
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

        const gauchada = {
            title: this.state.title,
            description: this.state.description,
            creationDate: this.state.creationDate,
            expirationDate: this.state.expirationDate,
            owner: this.state.owner,
            resolver: this.state.resolver
        }

        axios.post('http://localhost:5000/gauchadas/update/' + this.props.match.params.id, gauchada)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3> Edit Gauchada </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Title </label>
                        <input type="text"
                            required
                            className="form-control"
                            defaultValue={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label> Description </label>
                        <input type="text"
                            required
                            className="form-control"
                            defaultValue={this.state.description}
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
                        <input type="submit" value="Edit Gauchada" className="btn btn-primary" />
                    </div>

                </form>

            </div>
        )
    }

}