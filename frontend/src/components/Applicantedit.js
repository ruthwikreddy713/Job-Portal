import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import validator from 'validator';
import axios from "axios";
export default class Applicantedit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            newemail:'',
            newname:'',
            neweducation:'',
            newskills:''
        }
        this.onChangenewemail = this.onChangenewemail.bind(this);
        this.onChangenewname = this.onChangenewname.bind(this);
        this.onChangeneweducation= this.onChangeneweducation.bind(this);
        this.onChangenewskills = this.onChangenewskills.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        console.log("ok");
        const locaid = {
            id : localStorage.getItem("_id")
        };
        console.log(locaid.id);
        axios.post("http://localhost:4000/Jobapplicants/getdata",locaid)
        .then(user => {
            console.log("here");
            if(user){
                this.setState({data: user.data})
                this.setState({newname: user.data.name})
                this.setState({newemail:user.data.email})
                this.setState({newskills: user.data.skills})
                this.setState({neweducation: user.data.education})
            }
            else {
                alert("You can't access this ");
                this.props.history.push("/");
            }
        })
        .catch(err =>{
            console.log(err);
            alert("You can't access this ");
            this.props.history.push("/");
        });
    }
    onChangenewemail(event) {
        this.setState({ newemail: event.target.value });
    }
    onChangenewname(event) {
        this.setState({ newname: event.target.value });
    }
    onChangenewskills(event){
        this.setState({ newskills: event.target.value });
    }
    onChangeneweducation(event){
        this.setState({ neweducation: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const newdataofuser = {
            id: localStorage.getItem("_id"),
            newemail: this.state.newemail,
            newname: this.state.newname,
            neweducation: this.state.neweducation,
            newskills: this.state.newskills
        }
        console.log(this.state.newname);
        console.log(this.state.data.name);
        if(!validator.isAlpha(validator.blacklist(this.state.newname," "))){
            alert("Name should contain alphabets");
        }
        else if( !validator.isEmail(this.state.newemail)){
            console.log(this.state.newemail);
            alert("Email format incorrect");
        }
 //should validate education and skills later
        else {
            axios.post("http://localhost:4000/Jobapplicants/edit",newdataofuser,{crossDomain: true})
            .then(res => {
                if(res.data.error == "None"){
                    alert("Updated Succcessfully");
                }
                else if(res.data.error == "Can't update"){
                    alert("Failed Try again");
                }
                else if(res.data.error == "Account already created with the email"){
                    alert("Account already created with this email");
                }               
            }).
            catch(err=>{
                console.log(err);
                alert("Failed Try agian");
            })
        }
        this.setState({
            newemail: this.state.data.email,
            newname: this.state.data.name,
            neweducation: this.state.data.education,
            newskills: this.state.data.skills
        });
    }

    render() {
        return (
            <div>
            <h1>Edit your details and click update</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>New Email: </label>
                        <input type="text" 
                               className="form-control" 
                               defaultValue={this.state.data.email}
                            //   value = {this.state.newemail}
                               onChange={this.onChangenewemail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>New Name: </label>
                        <input type="text" 
                               className="form-control" 
                               defaultValue={this.state.data.name}
                             //  value={this.state.newname}
                               onChange={this.onChangenewname}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}