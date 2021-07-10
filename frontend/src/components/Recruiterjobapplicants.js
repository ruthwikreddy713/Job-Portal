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

export default class Recruiterjobapplicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alldata: [],
            reqdata: []
        };
    }
    componentDidMount() {
        console.log("ok");
        const applicants = {
            recruiterid : localStorage.getItem("_id"),
            jobid: localStorage.getItem("jobid")
        };
        console.log(applicants.recruiterid);
        console.log(applicants.jobid);
        axios.post("http://localhost:4000/Appliedjobs/unrejectedjobs",applicants)
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
                    id: data.applicantid
                }
                axios.post("http://localhost:4000/Jobapplicants/getdata",job)
                .then(found=>{
                    console.log(found.data);
                    let op=[...this.state.reqdata];
                    const jobdet=found.data;
                    jobdet.status=data.status;
                    jobdet.sop=data.sop;
                    op.push(jobdet);
                    this.setState({reqdata: op});
                    console.table(this.state.reqdata)
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
    onUpdate(str,aid){
        const appdet={
            jobid:localStorage.getItem("jobid"),
            applicantid: aid,
            newstatus: str
        };
        axios.post("http://localhost:4000/Appliedjobs/updatestatus",appdet)
        .then(respone=>{
            console.log(respone.data);
            if(respone.data==3)
                alert("Positions reached");
            else
                alert("Success operation");
            this.setState({
                alldata:[],
                reqdata:[]
            });
            this.componentDidMount();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    onsortup(str){
        let final=[...this.state.reqdata];
      /*  if(str=="title"){
            final.sort((a,b)=> (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
        }
        else if(str=="date"){
            final.sort((a,b)=> (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        }*/
        if(str=="name"){
            final.sort((a,b)=> (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
        }
        this.setState({reqdata: final});
    }
    onsortdown(str){
        let final=[...this.state.reqdata];
        /*if(str=="title"){
            final.sort((a,b)=> (a.title < b.title) ? -1 : ((b.title < a.title) ? 1 : 0));
        }
        else if(str=="date"){
            final.sort((a,b)=> (a.date < b.date) ? -1 : ((b.date < a.date) ? 1 : 0));
        }*/
        if(str=="name"){
            final.sort((a,b)=> (a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0));
        }
        this.setState({reqdata: final});
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
                            <li className="navbar-item">
                                <Link to="/Recruiteraccept" className="nav-link">Accepted applications</Link>
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
                                            <TableCell>
                                            Applicant Name
                                            <div className="font-icon-wrapper" onClick={()=>{this.onsortup("name");}}> <IconButton aria-label="up" ><ArrowUpwardIcon /></IconButton></div>
                                            <div className="font-icon-wrapper" onClick={()=>{this.onsortdown("name");}}> <IconButton aria-label="down" ><ArrowDownwardIcon /></IconButton></div> 
                                            </TableCell>
                                            <TableCell>Skills</TableCell>
                                            <TableCell>
                                            Date
                                            {/*<div className="font-icon-wrapper" onClick={()=>{this.onsortup("date");}}> <IconButton aria-label="up" ><ArrowUpwardIcon /></IconButton></div>
                                            <div className="font-icon-wrapper" onClick={()=>{this.onsortdown("date");}}> <IconButton aria-label="down" ><ArrowDownwardIcon /></IconButton></div>*/} 
                                            </TableCell>
                                            <TableCell>Education</TableCell>
                                            <TableCell>SOP</TableCell>
                                            <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.reqdata.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>user.dateofposting</TableCell>
                                            <TableCell>{user.skills}</TableCell>
                                            <TableCell>{user.education}</TableCell> 
                                            <TableCell>{user.sop}</TableCell>
                                            <TableCell>{user.status}</TableCell>
                                            {
                                            (user.status == "shortlisted") && <TableCell> <Button variant="contained" color="primary"onClick={()=>{this.onUpdate("accepted",user._id);}} >Accept</Button></TableCell>
                                            }
                                            {
                                            (user.status=="applied") && <TableCell> <Button variant="contained" color="primary"onClick={()=>{this.onUpdate("shortlisted",user._id);}} >Shortlist</Button></TableCell>   
                                            }
                                            {
                                            (user.status!="accepted") && <TableCell> <Button variant="contained" color="primary"onClick={()=>{this.onUpdate("rejected",user._id);}} >Reject</Button></TableCell>    
                                            }                                        
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