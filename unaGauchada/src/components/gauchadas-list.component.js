import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

var moment = require('moment');

const Gauchada = props => {
    let actions;
    if(localStorage.getItem('token')!=null) {
        if(props.gauchada.owner===localStorage.getItem('username')){
            actions = <td><Link to={"gauchadas/view/" + props.gauchada._id}>view</Link> | <Link to={"gauchadas/edit/" + props.gauchada._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGauchada(props.gauchada._id) }}>delete</a></td>
        } else {
            actions = <td><Link to={"gauchadas/view/" + props.gauchada._id}>view</Link> </td>
        }
    }
    return [
    <tr>
        <td>{props.gauchada.title}</td>
        <td>{moment(props.gauchada.creationDate).format('MM-DD-YYYY')}</td>
        <td>{moment(props.gauchada.expirationDate).format('MM-DD-YYYY')}</td>
        <td>{props.gauchada.owner}</td> {actions}
    </tr>
    ]
}


export default class GauchadasList extends Component {
    constructor(props) {
        super(props);

        this.deleteGauchada = this.deleteGauchada.bind(this)

        this.state = { gauchadas: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/gauchadas/')
            .then(response => {
                this.setState({ gauchadas: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteGauchada(id) {
        axios.delete('http://localhost:5000/gauchadas/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            gauchadas: this.state.gauchadas.filter(el => el._id !== id)
        })
    }

    viewGauchada(id) {
        window.location('http://localhost:3000/gauchadas/view/' + id);
    }

    gauchadaList() {
        return this.state.gauchadas.map(currentgauchada => {
            return <Gauchada gauchada={currentgauchada} deleteGauchada={this.deleteGauchada} key={currentgauchada._id} />;
        })
    }

    verifyToken(){
        return localStorage.getItem('token')!=null
    }
 
    render() {
        let actions
        if(this.verifyToken()) {
            actions =  <th>Actions</th>
        } else {
            actions =''
        }
        return [
            <div>
                <h3>Open Gauchadas</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Creation Date</th>
                            <th>Expiration Date</th>
                            <th>Owner</th>
                            {actions}
                        </tr>
                    </thead>
                    <tbody>
                        {this.gauchadaList()}
                    </tbody>
                </table>
            </div>
        ]
    }
}