import React, {Component} from 'react';
import axios from 'axios';
import validator from 'validator';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Recruiteraddjob extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            maximumapplications: '',
            maximumpositions: '',
            dateofposting:'',
            deadline: '',
            requiredskills: '',
            typeofjob:'',
            duration: '',
            salary: '' ,
            data: {} 
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeMaximumpositions = this.onChangeMaximumpositions.bind(this);
        this.onChangeMaximumapplications = this.onChangeMaximumapplications.bind(this);
        this.onChangeTypeofjob= this.onChangeTypeofjob.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
       // this.onChangeDateofposting = this.onChangeDateofposting.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeRequiredskills = this.onChangeRequiredskills.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);        
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
    //    console.log("ok");
        const locaid = {
            id : localStorage.getItem("_id")
        };
        console.log(locaid.id);
        axios.post("http://localhost:4000/Jobrecruiters/getdata/",locaid,{crossDomain : true}).then(user => {
            console.log("OK");
            //this.state.data = user.data;
            this.setState({data: user.data})
            //console.log(user.data.name);
        })
        .catch(err =>{
            console.log("No");
            alert("You Don't have permission to view this");
            this.props.history.push("/");
            console.log(err);
        });
    }
    handleOptionChange = (Event) => {
        this.setState({typeofjob: Event.target.value });
      };
    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeMaximumapplications(event) {
        this.setState({ maximumapplications: (event.target.validity.valid)? event.target.value : this.state.maximumapplications });
    }
    onChangeMaximumpositions(event) {
        this.setState({ maximumpositions: (event.target.validity.valid)? event.target.value : this.state.maximumpositions });
    }
    onChangeTypeofjob(event) {
        this.setState({ typeofjob: event.target.value });
    }
    onChangeDeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    onChangeRequiredskills(event) {
        this.setState({ requiredskills: event.target.value });
    }
    onChangeDuration(event) {
        this.setState({ duration: (event.target.validity.valid) ? event.target.value : this.state.duration });
    }
    onChangeSalary(event) {
        this.setState({ salary: (event.target.validity.valid)? event.target.value : this.state.salary });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log("Ok");
        var today= new Date();
        this.state.dateofposting = today.getDate()+'-'+(today.getMonth()+1) +'-'+today.getFullYear();        
        if(!this.state.title || !this.state.maximumapplications || !this.state.maximumpositions || !this.state.deadline || !this.state.typeofjob || !this.state.duration || !this.state.salary  ){
            alert("Fields can't be empty")
        }     
        const newJob = {
            title: this.state.title,
            nameofrecruiter: this.state.data.name,
            emailofrecruiter: this.state.data.email,
            maximumapplications: '',
            maximumpositions: '',
            dateofposting: this.state.dateofposting,
            deadline: this.state.deadline,
            requiredskills: this.state.requiredskills,
            typeofjob:this.state.typeofjob,
            duration: this.state.duration,
            salary: parseInt(this.state.salary,10),
            recruiterid: localStorage.getItem("_id")         
        }
        newJob.maximumapplications=parseInt(this.state.maximumapplications);
        newJob.maximumpositions=parseInt(this.state.maximumpositions);
        newJob.salary=parseInt(this.state.salary);
        if(!this.state.title || !this.state.maximumapplications || !this.state.maximumpositions || !this.state.deadline || !this.state.typeofjob || !this.state.duration || !this.state.salary  ){
            alert("Fields can't be empty")
        }
        else if(newJob.maximumpositions > newJob.maximumapplications) {
            console.log(this.state.maximumapplications);
            console.log(this.state.maximumpositions);
            alert("Applications can't be less than positions")
        }  
        else if(!validator.isAfter(this.state.deadline)){
            alert("Deadline can't be in past!");
        }
        else{
            console.log("Here");
            axios.post("http://localhost:4000/Jobrecruiters/createnewjob",newJob, {crossDomain : true})
            .then(res => {
                if(res.data.error == "None"){
                    alert("Success");
                }
                else{ 
                    console.log(res.data);
                    alert("Error while adding try again");
                }
            })
            .catch(err => {
                alert("Error try again");
            });
        }
       // else {
        //    alert("Type can't be empty");
       // }
        this.setState({
            title: '',
            maximumapplications: '',
            maximumpositions: '',
            dateofposting:'',
            deadline: '',
            requiredskills: '',
            typeofjob:'',
            duration: '',
            salary: ''  
        });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/Recruiterhome" className="navbar-brand"> Home </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/Recruiterjoblist" className="nav-link">My jobs</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
           <h1>Enter all details choose the type from the 3 options</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum Applications: </label>
                        <input type="text" 
                               className="form-control" 
                               pattern="[0-9]*"
                               value={this.state.maximumapplications}
                             //  pattern="[0-9]*"
                               onChange={this.onChangeMaximumapplications}
                             //  maxlength="1"
                               />  
                    </div>
                    <div className="form-group">
                        <label>Maximum Positions: </label>
                        <input type="text" 
                              //  min="0"
                               className="form-control" 
                               value={this.state.maximumpositions}
                               pattern="[0-9]*"
                               onChange={this.onChangeMaximumpositions}
                              // maxlength="1"
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline : </label>
                        <input type="datetime-local" 
                               className="form-control" 
                               value={this.state.deadline}
                              // pattern="[0-9]*"
                               onChange={this.onChangeDeadline}
                              // maxlength="1"
                               />  
                    </div>
                     <div className="form-group">   
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="Full-time"
                                checked={this.state.typeofjob === "Full-time"}
                                onChange={this.handleOptionChange}
                                className="form-check-input"
                            />
                            Full-time
                        </label>
                    </div>
                     <div className="form-group">   
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="Part-time"
                                checked={this.state.typeofjob === "Part-time"}
                                onChange={this.handleOptionChange}
                                className="form-check-input"
                            />
                            Part-time
                        </label>
                    </div>
                     <div className="form-group">   
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="Work from Home"
                                checked={this.state.typeofjob === "Work from Home"}
                                onChange={this.handleOptionChange}
                                className="form-check-input"
                            />
                            Work from Home
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.duration}
                               pattern="[0-6]*"
                               onChange={this.onChangeDuration}
                               maxlength="1"
                               />  
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.salary}
                               pattern="[0-9]*"
                               onChange={this.onChangeSalary}
                              // maxlength="1"
                               />  
                    </div>                    
                    <div className="form-group">
                        <input type="submit" value="Add Job" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}