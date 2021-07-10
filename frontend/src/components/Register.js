import React, {Component} from 'react';
import axios from 'axios';
import validator from 'validator';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            type: '',
            bio: '',
            contactnumber: ''
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType= this.onChangeType.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.onChangecontactnumber=this.onChangecontactnumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        localStorage.clear();
    }
    handleOptionChange = changeEvent => {
        this.setState({
          type: changeEvent.target.value });
      };
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }
    onChangebio(event){
        this.setState({bio: event.target.value});
    }
    onChangecontactnumber(event) {
        this.setState({ contactnumber: (event.target.validity.valid)? event.target.value : this.state.contactnumber });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log("Ok");
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        if( !validator.isEmail(this.state.email)){
            alert("Email format incorrect");
        }
        else if(!validator.isAlpha(validator.blacklist(this.state.name," "))){
            alert("Name should contain alphabets");
        }
        else if(this.state.type == "Applicant"){
            console.log("Here");
            axios.post("http://localhost:4000/Jobapplicants/register",newUser, {crossDomain : true})
            .then(res => {
                if(res.data.error == "Fields empty"){
                    alert("Fields empty");
                }
                else if(res.data.error == "Error"){ 
                    alert("Error while registering try again");
                    console.log("Error");
                }
                else if (res.data.error == "Email exists"){ 
                    alert("Email exists");
                    console.log("Email there")
                }
                else if (res.data.error == "None") {
                    alert("Registered Successfully");
                    console.log("Wait here");
                }
            });
        }
        else if(this.state.type == "Recruiter") {
            console.log("Noo");
            newUser.contactnumber=this.state.contactnumber;
            newUser.bio=this.state.bio;
            if(!this.state.bio || !this.state.contactnumber){
                alert("Fields empty");
            }
            else{
            axios.post("http://localhost:4000/Jobrecruiters/register/",newUser,{crossDomain : true}).then(res => {
                if(res.data.error == "Fields empty"){
                    alert("Fields empty");
                }                
                else if(res.data.error == "Error"){ 
                    alert("Error while registering try again");
                    console.log("Error");
                }
                else if (res.data.error == "Email exists"){ 
                    alert("Email exists");
                    console.log("Email there")
                }
                else if (res.data.error == "None") {
                    alert("Registered Successfully");
                    console.log("Wait here");
                }
            })
            .catch(err=>{
                console.log(err);
            })

            }
        }
        else {
            alert("Type can't be empty");
        }
        this.setState({
            name: '',
            email: '',
            password: '',
            type: ''
        });
    }
    rendercommon(){
        if(!this.state.type){
            return(
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
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
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
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
                </div>
                );
        }
        else return null;
    }
    renderrecruiter(){
        if(this.state.type=="Recruiter"){
            return(
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
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
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
                    <div>
                        <label>Bio:</label>
                        <input type="text"
                        className="form-control" 
                        value={this.state.bio}
                        onChange={this.onChangebio}/>
                    </div>
                    <div>
                        <label>Contact number:</label>
                        <input type="text"
                        pattern="[0-9]*"
                        maxlength="10"
                        className="form-control" 
                        value={this.state.contactnumber}
                        onChange={this.onChangecontactnumber}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
                </div>
                );
        }
        else return null;
    }
    renderapplicant(){
        if(this.state.type=="Applicant"){
            return(
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
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
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
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
                </div>
                );
        }
        else return null;
    }
    render() {
        return (
            <div>
                {this.rendercommon()}
                {this.renderrecruiter()}
                {this.renderapplicant()}
            </div>
        )
    }
}