import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Home'
import Register from './components/Register'
import Login from "./components/Login"
import ApplicantHome from "./components/ApplicantHome"
import RecruiterHome from "./components/RecruiterHome"
import Applicantedit from "./components/Applicantedit"
import Recruiteredit from "./components/Recruiteredit"
import Recruiteraddjob from "./components/Recruiteraddjob"
import Recruiterjoblist from "./components/Recruiterjoblist"
import Jobedit from "./components/Jobedit"
import Applicantjobs from "./components/Applicantjobs"
import Applicantapplications from "./components/Applicantapplications"
import Recruiterjobapplicants from "./components/Recruiterjobapplicants"
import Recruiteraccept from "./components/Recruiteraccept"
function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/ApplicantHome" exact component={ApplicantHome}/>
        <Route path="/RecruiterHome" exact component={RecruiterHome}/>
        <Route path="/Applicantedit" exact component={Applicantedit}/>
        <Route path="/Recruiteredit" exact component={Recruiteredit}/>
        <Route path="/Recruiteraddjob" exact component={Recruiteraddjob}/>
        <Route path="/Recruiterjoblist" exact  component={Recruiterjoblist}/>
        <Route path="/Jobedit" exact component={Jobedit}/>
        <Route path="/Applicantjobs" exact component={Applicantjobs}/>
        <Route path="/Applicantapplications" exact component={Applicantapplications}/>
        <Route path="/Recruiterjobapplicants" exact component={Recruiterjobapplicants}/>
        <Route path="/Recruiteraccept" exact component={Recruiteraccept}/>
      </div>
    </Router>
  );
}

export default App;