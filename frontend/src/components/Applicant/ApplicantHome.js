import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import axios from "axios";
export default class Applicantedit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount() {
        console.log("ok");
        const locaid = {_
            id : localStorage.getItem("_id")
        };
        axios.post("localhost:4000/Jobapplicants/getdata",locaid)
        .then(user => {
            this.state.data = user.data;
            console.log(user.data.name);
        })
        .catch(err =>{
            console.log(err);
        });
    }
    render() {
        return (
            <div>                
            <h1> Welcomee {this.state.data.name} </h1>
            </div>
        );
    }
}