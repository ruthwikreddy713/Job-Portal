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

export default class Applicantapplications extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            alldata: [],
            reqdata: []
        };
    }
    componentDidMount() {
        console.log("ok");
        let currdate=new Date().toISOString();
        const locaid = {
            applicantid : localStorage.getItem("_id")
        };
        console.log(locaid.applicantid);
        axios.post("http://localhost:4000/Appliedjobs/applicantapplications",locaid)
        .then(response => {
            if(response){
                console.log("ok");
                console.table(response.data);
            }
            this.setState({alldata: response.data});
            console.table(this.state.alldata);
            console.log(JSON.stringify(response.data));
            {response.data.map((data,index)=>{
                console.log(data);
            });};
        })
        .then(()=>{
            let alldat=[...this.state.alldata]
            alldat.map((data,index)=> {
                const job={
                    jobid: data.jobid
                }
                axios.post("http://localhost:4000/Jobrecruiters/jobdet",job)
                .then(found=>{
                    if(found){
                    console.log(found.data);
                    let op=[...this.state.reqdata];
                    const jobdet=found.data;
                    if(jobdet.deadline.toString() < currdate.toString() )
                        jobdet.status="rejected";
                    else
                        jobdet.status=data.status;
                    op.push(jobdet);
                    this.setState({reqdata: op});
                    console.table(this.state.reqdata)
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            })
        .catch(err=>{
            console.log(err);
        })

    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/Applicanthome" className="navbar-brand"> Home </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/Applicantjobs" className="nav-link">Available Jobs</Link>
                            </li>                           
                        </ul>
                    </div>
                </nav>
           <h1>My Applications </h1>
           <div>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> Sr No.</TableCell>
                                            <TableCell> Job Title</TableCell>
                                            <TableCell>Date of Posting</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Recruiter Name</TableCell>
                                            <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.reqdata.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell>{user.title}</TableCell>
                                            <TableCell>{user.dateofposting}</TableCell>
                                            <TableCell>{user.salary}</TableCell>
                                            <TableCell>{user.nameofrecruiter}</TableCell> 
                                            <TableCell>{user.status}</TableCell>                  
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