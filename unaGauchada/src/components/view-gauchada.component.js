import React, { Component } from 'react';
import axios from 'axios';

var moment = require('moment');

export default class ViewGauchada extends Component {

    constructor(props) {
        super(props);

       // this.onSubmit = this.onSubmit.bind(this);

        this.state = {
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
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    creationDate: response.data.creationDate,
                    expirationDate: response.data.expirationDate,
                    owner: response.data.owner,
                    resolver: response.data.resolver
                })
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e){
        
    }

    render() {
        let applyVerified;
        if(this.state.owner !== localStorage.getItem('username')){
            applyVerified = <div className="form-group"><input type="submit" value="Apply" className="btn btn-primary" /></div>
        }        
        return [
            <div>
                <h3> {this.state.title} </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Description: </label>
                            {' ' +this.state.description}
                    </div>

                    <div className="form-group">
                        <label> Owner: </label>
                        {' ' + this.state.owner}
                    </div>

                    <div className="form-group">
                        <label>Creation Date: </label>
                        <div>
                            {moment(this.state.creationDate).format('MM-DD-YYYY')}
                        </div>
                    </div>
                    <div className="form-group" disabled>
                        <label>Expiration Date: </label>
                        <div>
                            {moment(this.state.expirationDate).format('MM-DD-YYYY')}
                        </div>
                    </div> {applyVerified}
                </form>
            </div>
        ]
    }
}