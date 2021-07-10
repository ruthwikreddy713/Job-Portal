import React, {Component} from 'react';
import axios from 'axios';
import validator from 'validator';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            type: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType= this.onChangeType.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        localStorage.setItem("_id", " ");
    }
    handleOptionChange = changeEvent => {
        this.setState({
          type: changeEvent.target.value });
      };
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        if( !validator.isEmail(this.state.email)){
            alert("Email format incorrect");
        }
        else if(this.state.type == "Applicant"){
            axios.post("http://localhost:4000/Jobapplicants/login",newUser, {crossDomain : true}).then(res => {
                if(res.data.error == "Email not found") alert("Email doesnt exist");
                else if (res.data.error == "Passwords Don't match") alert("Passwords Don't match");
                else if (res.data.error == "passwords match") {
                    localStorage.setItem("_id", res.data.userd._id);                    
                    this.props.history.push("/ApplicantHome");
                }
            });
        }
        else if(this.state.type == "Recruiter") {
            axios.post("http://localhost:4000/Jobrecruiters/login",newUser).then(res => {
                if(res.data.error == "Email not found") alert("Email doesnt exist");
                else if (res.data.error == "Passwords Don't match") alert("Passwords Don't match");
                else if (res.data.error == "passwords match") {
                    localStorage.setItem("_id", res.data.userd._id);  
                    this.props.history.push("/RecruiterHome");
                }
            });
        }
        else {
            alert("Select Type it can't be empty")
        }
        this.setState({
            email: '',
            password: '',
            type: ''
        });
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
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="Applicant"
                                checked={this.state.type === "Applicant"}
                                onChange={this.handleOptionChange}
                                className="form-check-input"
                            />
                            Applicant
                        </label>
                     </div>
                     <div className="form-group">   
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="Recruiter"
                                checked={this.state.type === "Recruiter"}
                                onChange={this.handleOptionChange}
                                className="form-check-input"
                            />
                            Recruiter
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}