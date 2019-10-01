import React, { Component } from 'react';
import CreateGauchada from "./create-gauchada.component";
import axios from 'axios';

export default class EditGauchada extends CreateGauchada {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);

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
        let id = (this.props.location.search).substring((this.props.location.search).indexOf('=') + 1, (this.props.location.search).length);

        console.log("llego");

        axios.get('http://localhost:5000/gauchadas/' + id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    //creationDate: response.data.creationDate,
                    //expirationDate: response.data.expirationDate,
                    owner: response.data.owner,
                    resolver: response.data.resolver
                })
                console.log(CreateGauchada.state);
            })
            .catch((error) => {
                console.log(error);
            })
        
    }

    render() {
        return super.render()   
    }
}