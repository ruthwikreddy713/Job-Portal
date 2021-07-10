import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Login from"./Login";
import Register from "./Register";

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
    componentDidMount(){
        localStorage.clear();
    }
    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand"> Demo </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            <h1> Welcomee </h1>
            </div>
        );
    }
}
