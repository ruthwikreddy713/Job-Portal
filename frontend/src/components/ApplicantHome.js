import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import axios from "axios";
export default class ApplicantHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            data: {}
        };
    }
    componentDidMount() {
    //    console.log("ok");
        const locaid = {
            id : localStorage.getItem("_id")
        };
        console.log(locaid.id);
        axios.post("http://localhost:4000/Jobapplicants/getdata/",locaid,{crossDomain : true}).then(user => {
            console.log("OK");
            console.log(user.data);
            if(user.data==1){
                alert("can't access this");
                this.props.history.push("/");
            }
            //this.state.data = user.data;
            else {
                this.setState({data: user.data})
            }
            //console.log(user.data.name);
        })
        .catch(err =>{
            console.log("No");
            alert("You Don't have permission to view this");
            this.props.history.push("/");
            console.log(err);
        });
    }
    render() {
            const mystyle ={
                color: "white",
                backgroundColor: "DodgerBlue",
                padding: "10px",
                paddingright: "20px",
                marginleft: "50%",
                fontFamily: "Arial"
            };
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand"> Logout </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/Applicantjobs" className="nav-link">Available Jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/Applicantapplications" className="nav-link">My Applications</Link>
                            </li>                           
                        </ul>
                    </div>
                </nav>
            <div>                
            <h1> Hello {this.state.data.name} </h1>    
            <a href="/Applicantedit" style={mystyle} >Edit Profile</a>
            </div>
        </div>    
        );
    }
}