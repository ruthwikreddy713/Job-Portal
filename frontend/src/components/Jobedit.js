import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import validator from 'validator';
import axios from "axios";
export default class Jobedit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            newmaximumapplications:'',
            newmaximumpositions:'',
            newdeadline:''
        }
        this.onChangenewmaximumapplications = this.onChangenewmaximumapplications.bind(this);
        this.onChangenewmaximumpositions= this.onChangenewmaximumpositions.bind(this);
        this.onChangenewdeadline = this.onChangenewdeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        console.log("ok");
        const locaid = {
            jobid : localStorage.getItem("jobid")
        };
        console.log(locaid.id);
        axios.post("http://localhost:4000/Jobrecruiters/jobdet",locaid)
        .then(user => {
            //console.log("here");
            if(user){
                this.setState({data: user.data})
                this.setState({newmaximumapplications:user.data.maximumapplications})
                this.setState({newdeadline: user.data.deadline})
                this.setState({newmaximumpositions: user.data.maximumpositions})
                console.log("Hello")
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
    onChangenewmaximumapplications(event) {
        this.setState({ newmaximumapplications: (event.target.validity.valid)? event.target.value : this.state.newmaximumapplications });
    }
    onChangenewdeadline(event){
        this.setState({ newdeadline: event.target.value });
    }
    onChangenewmaximumpositions(event){
        this.setState({ newmaximumpositions: (event.target.validity.valid)? event.target.value : this.state.newmaximumpositions });
    }
    onSubmit(e) {
        e.preventDefault();
        const newjobdet = {
            jobid: localStorage.getItem("jobid"),
            newmaximumapplications: this.state.newmaximumapplications,
            newmaximumpositions: this.state.newmaximumpositions,
            newdeadline: this.state.newdeadline
        }
        console.log(this.state.data.deadline);
        //console.log(this.state.newname);
        //console.log(this.state.data.name);
 //should validate maximumpositions and deadline later
        console.log(newjobdet.jobid);
        console.log(newjobdet.newdeadline);
        newjobdet.newmaximumapplications=parseInt(this.state.newmaximumapplications);
        newjobdet.newmaximumpositions=parseInt(this.state.newmaximumpositions);
        if(newjobdet.newmaximumpositions > newjobdet.newmaximumapplications){
            alert("Applicants can't be less than positions");
        }
        else {
        axios.post("http://localhost:4000/Jobrecruiters/editjob",newjobdet)
        .then(res => {
            console.log(res);
            if(res.data.error == "Noerror"){
                this.state.newmaximumapplications=newjobdet.newmaximumapplications;
                this.state.newmaximumpositions=newjobdet.newmaximumpositions;
                alert("Updated Succcessfully go back");
                this.setState({
                    newmaximumpositions: '',
                    newmaximumapplications:'',
                    newdeadline: ''
                });
                this.componentDidMount();
            }             
        }).
        catch(err=>{
            console.log(err);
            alert("Failed Try agian");
        })
        }
        this.setState({
            newmaximumapplications: this.state.data.maximumapplications,
    //        newname: this.state.data.name,
            newmaximumpositions: this.state.data.maximumpositions,
            newdeadline: this.state.data.deadline
        });
    }

    render() {
        return (
            <div>
            <h1>Edit {this.state.data.title} details and click update</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>New maximumapplications: </label>
                        <input type="text" 
                               className="form-control"
                               pattern="[0-9]*"
                            //   defaultValue={this.state.data.maximumapplications}
                               value = {this.state.newmaximumapplications}
                               onChange={this.onChangenewmaximumapplications}
                               />  
                    </div>
                    <div className="form-group">
                        <label>New maximumpositions: </label>
                        <input type="text" 
                               className="form-control" 
                               pattern="[0-9]*"
                            //   defaultValue={this.state.data.maximumpositions}
                               value = {this.state.newmaximumpositions}
                               onChange={this.onChangenewmaximumpositions}
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