import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

export default class Applicantjobs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: [], reqdata: [],searchText:'',minsalary:'',maxsalary:'',typecheck:'',durationcheck:''};
        this.onChangesearch = this.onChangesearch.bind(this);
        this.search=this.search.bind(this);
        this.typefixed=this.typefixed.bind(this);
        this.minsalarychange=this.minsalarychange.bind(this);
        this.maxsalarychange=this.maxsalarychange.bind(this);
        this.durationchange=this.durationchange.bind(this);
    //    this.checkstate = this.checkstate(this);
    }

    componentDidMount() {
        const appdet={
            applicantid: localStorage.getItem('_id')
        }
        axios.post('http://localhost:4000/Jobrecruiters/Applicantjobview',appdet,{crossDomain: true})
             .then(response => {
                //  console.log(response);
                console.table(response.data);
                this.setState({users: response.data});
                this.setState({reqdata: response.data});
                this.setState({searchText: ''});
             })
             .catch(function(error) {
                 console.log(error);
                //  console.log("errorrrr");
             });
    }
    search(txt){
        let final=[...this.state.users];
        let final2=[];
        if(!txt){
            this.setState({reqdata: final});
        }
        else{
        {final.map((val,index)=>{
            console.log(val.title);
            console.log(val.title.search(txt));
            console.log(val.title.toString().toLowerCase())
        })};
        {final.filter(job => job.title.toString().toLowerCase().search(txt.toString().toLowerCase()) >= 0).map(op=> {
            final2.push(op);
        })};
        this.setState({reqdata: final2});
        }
    }
    onChangesearch(event) {
        const str=event.target.value;
        this.setState({searchText: event.target.value});
        console.log("ok");
        console.log(event.target.value);
        console.log(this.state.searchText);
        this.search(str);
    }
    onsortup(str){
        let final=[...this.state.reqdata];
        if(str=="salary"){
            final.sort((a,b)=> (a.salary < b.salary) ? 1 : ((b.salary < a.salary) ? -1 : 0));
        }
        else if(str=="duration"){
            final.sort((a,b)=> (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0));
        }
        this.setState({reqdata: final});
    }
    onsortdown(str){
        let final=[...this.state.reqdata];
        if(str=="salary"){
            final.sort((a,b)=> (a.salary > b.salary) ? 1 : ((b.salary > a.salary) ? -1 : 0));
        }
        else if(str=="duration"){
            final.sort((a,b)=> (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0));
        }
        this.setState({reqdata: final});
    }
    typefixed=(event)=>{
        this.setState({typecheck: event.target.value});
        if(event.target.value=="none")
            this.setState({reqdata: this.state.users});
        else {
        //const str=event.target.value;
        let final=[...this.state.users];
        let final2=[];
        final.filter(job => job.type == event.target.value).map(op=>{
            final2.push(op);
        });
        this.setState({reqdata: final2});
        }
    }
    durationchange=(event)=>{
        this.setState({durationcheck: event.target.value});
        if(event.target.value=="none"){
            this.setState({reqdata: this.state.users});
        }
        else{
        console.log("change durationchange");
        const dur=event.target.value;
        let final=[...this.state.users];
        let final2=[];
        final.filter(job=>job.duration < dur).map(op=>{
            final2.push(op);
        });
        this.setState({reqdata: final2});
        }
    }
    minsalarychange(event){
        if(!event.target.value){
            this.setState({minsalary:'0'});
            this.setState({reqdata: this.state.users});
        }
        else{
        const ch=parseInt(event.target.value,10);
        this.setState({minsalary: ch});
        }
    }
    maxsalarychange(event){
        if(!event.target.value){
            this.setState({maxsalary:'1000000000000'});
            this.setState({reqdata: this.state.users});
        }
        else{
            let val=parseInt(event.target.value,10);
            this.setState({maxsalary: val});
        }
    }
    onApplysalaryfilter(){
        let final=[...this.state.users];
        let final2=[];
        final.filter(job=> (job.salary > this.state.minsalary && job.salary< this.state.maxsalary)).map(op=>{
            final2.push(op);
        });
        this.setState({reqdata: final2});
    }
    onApply(jobid){
        const job={ jobid: jobid};
        console.log(job.jobid);
        const newapplication={
            jobid:"",
            applicantid:"",
            recruiterid:"",
            sop:""
        }
        var sop=prompt("Enter SOP 250 words max");
        if(sop){
            axios.post('http://localhost:4000/Jobrecruiters/jobdet',job)
            .then(response=>{
                if(response){
                    console.log("ok");
                    newapplication.jobid=jobid;
                    newapplication.recruiterid=response.data.recruiterid;
                    console.log(response.data.recruiterid);
                    newapplication.sop=sop;
                    newapplication.applicantid=localStorage.getItem("_id");
                }
            }).then(()=>{
                axios.post('http://localhost:4000/Appliedjobs/add',newapplication)
                .then(reply=>{
                    if(reply.data.error=="1")
                        alert("Applied Successfully");
                    else if(reply.data.error=="exists")
                        alert("Already applied!");
                    else if(reply.data.error=="accepted")
                        alert("You are already accepted to a job you can't apply now")
                    else {
                        console.log(reply);
                        alert("error try again");
                    }
                }).then(()=>{
                    this.setState({
                        users:[],
                        reqdata:[],
                        searchText:'',
                        minsalary:'',
                        maxsalary:''
                    });
                    this.componentDidMount();
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else{
            alert("SOP can't be empty")
        }
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
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullwidth={true}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        onChange={this.onChangesearch}
                        />
                    </List>
                    </Grid>
                </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField type={"number"} id="standard-basic" fullwidth={true} onChange={this.minsalarychange} label="Enter Min"  />
                                    <TextField type={"number"} id="standard-basic" fullwidth={true} onChange={this.maxsalarychange} label="Enter Max" />
                                    <Button variant="contained" color="primary" onClick={()=>{this.onApplysalaryfilter();}} > Apply</Button>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <h7>Duration</h7>
                                <div>
                                    <select id="type" onChange={this.durationchange} value={this.state.durationcheck}>
                                    <option value="none" onChange={this.durationchange}>none</option>
                                    <option value="1" onChange={this.durationchange}>1</option>
                                    <option value="2" onChange={this.durationchange}>2</option>
                                    <option value="3" onChange={this.durationchange}>3</option>
                                    <option value="4" onChange={this.durationchange}>4</option>
                                    <option value="5" onChange={this.durationchange}>5</option>
                                    <option value="6" onChange={this.durationchange}>6</option>
                                    <option value="7" onChange={this.durationchange}>7</option>
                                    </select>
                                </div>
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <h7>Typr of Job</h7>
                                <div>
                                    <select id="type" onChange={this.typefixed} value={this.state.typecheck}>
                                    <option value="none" onChange={this.typefixed}>None</option>
                                    <option value="Work from Home" onChange={this.typefixed}>Work from Home</option>
                                    <option value="Full-time" onChange={this.typefixed}>Full Time</option>
                                    <option value="Part-time" onChange={this.typefixed}>Part Time</option>
                                    </select>
                                </div>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> Sr No. </TableCell>
                                            <TableCell>Job Title</TableCell>
                                            <TableCell>
                                            Salary
                                            <div className="font-icon-wrapper" onClick={()=>{this.onsortup("salary");}}> <IconButton aria-label="up" ><ArrowUpwardIcon /></IconButton></div>
                                            <div className="font-icon-wrapper" onClick={()=>{this.onsortdown("salary");}}> <IconButton aria-label="down" ><ArrowDownwardIcon /></IconButton></div> 
                                            </TableCell>
                                            <TableCell>
                                            Duration
                                            <div className="font-icon-wrapper" onClick={()=>{this.onsortup("duration");}}> <IconButton aria-label="up" ><ArrowUpwardIcon /></IconButton></div>
                                            <div className="font-icon-wrapper" onClick={()=>{this.onsortdown("duration");}}> <IconButton aria-label="down" ><ArrowDownwardIcon /></IconButton></div> 
                                            </TableCell>
                                            <TableCell>Deadline</TableCell>
                                            <TableCell>Apply</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.reqdata.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell>{user.title}</TableCell>
                                            <TableCell>{user.salary}</TableCell>
                                            <TableCell>{user.duration}</TableCell>
                                            <TableCell>{user.deadline}</TableCell>
                                            {
                                                (user.status=="full") &&  <TableCell> <Button variant="contained" color="inherit" > Full</Button> </TableCell>
                                            }
                                            {   
                                                (user.status=="notapplied") && <TableCell> <Button variant="contained" color="primary" onClick={()=>{this.onApply(user.id);}} > Apply</Button> </TableCell>                 
                                            }
                                            {
                                                (user.status=="applied") && <TableCell> <Button variant="contained" color="secondary" > Applied</Button> </TableCell>
                                            }
                                        </TableRow>
                                ))
                                }
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>          
            </div>
        )
    }
}