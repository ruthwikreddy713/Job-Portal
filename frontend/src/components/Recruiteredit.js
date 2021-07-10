import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import validator from 'validator';
import axios from "axios";
export default class Recruiteredit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            newemail:'',
            newname:'',
            newcontactnumber:'',
            newbio:''
        }
        this.onChangenewemail = this.onChangenewemail.bind(this);
        this.onChangenewname = this.onChangenewname.bind(this);
        this.onChangenewcontactnumber= this.onChangenewcontactnumber.bind(this);
        this.onChangenewbio = this.onChangenewbio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        console.log("ok");
        const locaid = {
            id : localStorage.getItem("_id")
        };
        console.log(locaid.id);
        axios.post("http://localhost:4000/Jobrecruiters/getdata",locaid)
        .then(user => {
            console.log("here");
            if(user){
                this.setState({data: user.data})
                this.setState({newname: user.data.name})
                this.setState({newemail:user.data.email})
                this.setState({newbio: user.data.bio})
                this.setState({newcontactnumber: user.data.contactnumber})
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
    onChangenewbio(event){
        this.setState({ newbio: event.target.value });
    }
    onChangenewcontactnumber(event){
        this.setState({ newcontactnumber: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const newdataofuser = {
            id: localStorage.getItem("_id"),
            newemail: this.state.newemail,
            newname: this.state.newname,
            newcontactnumber: this.state.newcontactnumber,
            newbio: this.state.newbio
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
 //should validate contactnumber and bio later
        else {
            axios.post("http://localhost:4000/Jobrecruiters/edit",newdataofuser,{crossDomain: true})
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
            newcontactnumber: this.state.data.contactnumber,
            newbio: this.state.data.bio
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
                        <label>New contactnumber: </label>
                        <input type="text" 
                               className="form-control" 
                               defaultValue={this.state.data.contactnumber}
                             //  value={this.state.newname}
                               onChange={this.onChangenewcontactnumber}
                               />  
                    </div>
                    <div className="form-group">
                        <label>New Bio: </label>
                        <input type="text" 
                               className="form-control" 
                               defaultValue={this.state.data.bio}
                             //  value={this.state.newname}
                               onChange={this.onChangenewbio}
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