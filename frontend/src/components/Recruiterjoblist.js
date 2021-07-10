import React, {Component} from 'react';
import axios from 'axios';
import validator from 'validator';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from "@material-ui/icons/Delete"
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default class Recruiterjoblist extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            alldata: []
        };
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    componentDidMount() {
        localStorage.setItem("jobid","");
        console.log("ok");
        const locaid = {
            id : localStorage.getItem("_id")
        };
        console.log(locaid.id);
        axios.post("http://localhost:4000/Jobrecruiters/getdata/",locaid,{crossDomain : true})
        .then(user => {
            console.log("OOO");
            console.log(user.data.email);
        //    this.state.email = user.data.email;
            this.setState({email: user.data.email})
            //console.log(user.data.name);
        }).then(()=>{
            const recr = {
                recruiteremail: this.state.email
            }
            console.log(this.state.email);
            axios.post("http://localhost:4000/Jobrecruiters/activejobs/",recr,{crossDomain : true})
            .then(user => {
                console.log("Ok");
             //   console.log(user.data._id);
                this.setState({alldata: user.data});
             //   this.state.alldata = [...user.data];
        //        console.log(this.state.alldata.name);
                //console.log(user.data.name);
            })
            .catch(err =>{
                console.log("No");
                console.log(err);
                alert("You Don't have permission to view this");
         //       this.props.history.push("/");
          //      console.log(err);
            });
        })
        .catch(err =>{
            console.log("111");
            alert("You Don't have permission to view this");
            this.props.history.push("/");
            console.log(err);
        });
    }
    onDelete(deljobid) {
        const jobdets={
            jobid: deljobid
        };
        console.log("hi");
        console.log(deljobid);
        axios.post("http://localhost:4000/Jobrecruiters/deletejob",jobdets,{crossDomain: true})
        .then(del => {
    //        alert("deleted");
            console.log("deleted");
        }).then(()=>{
            const recr = {
                recruiteremail: this.state.email
            }
            console.log(this.state.email);
            axios.post("http://localhost:4000/Jobrecruiters/activejobs/",recr,{crossDomain : true})
            .then(user => {
                console.log("Ok");
             //   console.log(user.data._id);
                this.setState({alldata: user.data});
             //   this.state.alldata = [...user.data];
                console.log(this.state.alldata.name);
                //console.log(user.data.name);
            })
            .catch(err =>{
                console.log("No");
                console.log(err);
                alert("You Don't have permission to view this");
         //       this.props.history.push("/");
          //      console.log(err);
            });
        })
        .catch(err=>{
            console.log(err);
            alert("Error occured");
        });    
    }
    onEdit(ejobid){
        localStorage.setItem("jobid",ejobid);
        this.props.history.push('/Jobedit');
    }
    ontouch(jobid){
        localStorage.setItem("jobid",jobid);
        this.props.history.push('/Recruiterjobapplicants');
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/Recruiterhome" className="navbar-brand"> Home </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/Recruiteraddjob" className="nav-link">Addjob</Link>
                            </li>                          
                        </ul>
                    </div>
                </nav>
           <h1>My Joblistings</h1>
           <div>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> Sr No.</TableCell>
                                            <TableCell> Job Title</TableCell>
                                            <TableCell>Date of Posting</TableCell>
                                            <TableCell>Maximum applications</TableCell>
                                            <TableCell>maximum positions</TableCell>
                                            <TableCell>Delete option</TableCell>
                                            <TableCell>Edit option</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.alldata.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell><div onClick={()=>{this.ontouch(user._id);}}>{user.title}</div></TableCell>
                                            <TableCell>{user.dateofposting}</TableCell>
                                            <TableCell>{user.maximumapplications}</TableCell>
                                            <TableCell> {user.maximumpositions}</TableCell>     
                                            <TableCell><div class="font-icon-wrapper" onClick={()=>{this.onDelete(user._id);}}> <IconButton aria-label="delete" ><DeleteIcon /></IconButton></div></TableCell>
                                            <TableCell> <Button variant="contained" color="primary"onClick={()=>{this.onEdit(user._id);}} >Edit</Button></TableCell>               
                                        </TableRow>
                                ))
                                }
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>            
            </div>
            </div>
        )
    }
}