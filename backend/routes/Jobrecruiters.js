var express= require("express");
var router = express.Router();
const Jobrecruiter = require("../models/Jobrecruiters");
const Job=require("../models/Jobs");
const Appliedjob=require("../models/Appliedjobs");
//GET to get all users
router.get("/",function(req, res) {
	Jobrecruiter.find(function(err, jobrecruiters){
		if(err) {
			console.log(err);
		}
		else {
			res.json(jobrecruiters);
		}
	})
});

//POST to add 
router.post("/register", (req,res) =>  {
	const newJobrecruiter = new Jobrecruiter({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		contactnumber: req.body.contactnumber,
		bio: req.body.bio
	});
	let reply={
		error: ""
	};
	const email = newJobrecruiter.email;
	if(!email || !newJobrecruiter.name || !newJobrecruiter.password){
		reply.error = "Fields empty";
		return res.json(reply);
	}
	Jobrecruiter.findOne({email}).then(user => {
		if(!user){
			newJobrecruiter.save()
				.then(user => {
					reply.error = "None";
					return res.json(reply);
				})
				.catch(err => {
					reply.error = "Error";
					return res.json(reply);
				});
		}
		if(user) {
			reply.error = "Email exists";
			return res.json(reply);
		}
	})
});
//POST to add 
router.post("/login", (req,res) =>  {
	const email = req.body.email;
	const password = req.body.password;
	let reply={
		error: "",
		userd: {}
	};
	if(!email || !password){
		reply.error = "Fields empty";
		return res.json(reply);
	}
	Jobrecruiter.findOne({email}).then(user => {
		if(!user){
			reply.error = "Email not found";
			return res.json(reply);
		}
		else {
	//		res.send("Email Found")
			if(password == user.password){
				reply.error="passwords match";
				reply.userd = user;				
				return res.json(reply);
			}
			else{
				reply.error = "Passwords Don't match";
				return res.json(reply);
			}
		}
	});
});
//Editing
router.post("/edit", (req,res) => {
	const id = req.body.id;
	const newemail = req.body.newemail;
	const newname = req.body.newname;
	const newcontactnumber = req.body.newcontactnumber;
	const newbio = req.body.newbio;
	let reply= {
		error: ""
	}
	Jobrecruiter.findOne({"_id": id}).then(user => {
		if(user){
			user.name=newname
		//	return res.json(user);
			if(user.email == newemail){
		//		user.name == newname;
				user.email = newemail;
				user.contactnumber = newcontactnumber;
				user.bio = newbio;	
			//	return res.json(user);
				Jobrecruiter.updateOne({'_id':id},user)
				.then(user2 =>{
					reply.error="None";
					return res.json(reply);
				})	
				.catch(err =>{
					reply.error="Can't update";
					return res.json(reply);
				});	
			}
			Jobrecruiter.findOne({'email': newemail})
			.then(userf => {
				if(!userf){
					user.name=newname;
					user.email = newemail;
					user.contactnumber = newcontactnumber;
					user.bio = newbio;
					Jobrecruiter.updateOne({'_id':id},user)
					.then(user1 =>{
						reply.error="None";
						return res.json(reply);
					})
					.catch(err =>{
						reply.error="Can't update";
						return res.json(reply);
					});
				}
				else {
					if(user.email == newemail && user.name == newname && user.contactnumber == newcontactnumber && user.bio == newbio){
						reply.error="None";
					}
					else{
						reply.error="Account already created with the email";
					}
					return res.json(reply);
				}
			})
			.catch(err=>{
				reply.error = "Can't update";
				return res.json(reply);
			})
	//		return res.json(user);
//			return res.json(user);
		}
		else {
			reply.error="User doesn't exist";
			return res.send(reply);
		}
	});
});
//Getting data
router.post("/getdata",(req,res) => {
	const id = req.body.id;
	Jobrecruiter.findOne({'_id':id})
	.then(user => {
		if(user){
//			console.log("Ok found one");
			return res.json(user);
		}
		else{
//			console.log("No Email exists");
			return res.send("0");
		}
	})
	.catch(err =>{
		return res.send("1");
	});
});
router.post("/createnewjob",(req,res) =>{
	const newjob = new Job({
		title:  req.body.title,
		nameofrecruiter: req.body.nameofrecruiter,
		emailofrecruiter: req.body.emailofrecruiter,
		maximumapplications: req.body.maximumapplications,
		maximumpositions: req.body.maximumpositions,
		dateofposting: req.body.dateofposting,
		deadline: req.body.deadline,
		requiredskills: req.body.requiredskills,
		typeofjob: req.body.typeofjob,
		duration: req.body.duration,
		salary: req.body.salary	,
		recruiterid: req.body.recruiterid
	});
//	return res.json(newjob);
	let reply = {
		error: ""
	}
	newjob.save()
	.then (user =>{
		reply.error="None";
		return res.json(reply);
	})
	.catch(err =>{
		reply.error="Failed";
		return res.json(err);
	});
});
router.post("/deletejob", (req,res) =>{
	const id=req.body.jobid;
	let reply={
		error: ""
	}
	Job.deleteOne({'_id':id})
	.then(job => {
		if(job){
			reply.error="None";
			return res.json(reply);
		}
		else{
			reply.error="deleted already";
			return res.json(reply);
		}
	})
	.catch(err =>{
		return res.json(err);
	});
});
router.get("/jobdets",(req,res) => {
	Job.find(function(err,jobs){
		if(err)
			return res.json(err);
		else
			return res.json(jobs);
	});
});
router.post("/activejobs",(req,res)=> {
	let reply={
		error:'',
		alldata: []
	}
	let currdate=new Date().toISOString();
	const recruiteremail=req.body.recruiteremail;
	Job.find({'emailofrecruiter':recruiteremail, 'deadline':{$gt: currdate}})
	.then(jobs =>{
		if(jobs){
//			return res.send("1");
			reply.error="None";
//			reply.alldata = jobs;
			return res.json(jobs);
		}
		else {
			reply.error="Empty";
			return res.json(reply);
		}
	})
	.catch(err=>{
		reply.error="Error";
		return res.json(reply);
	});
});
router.post("/jobdet",(req,res)=> {
	const id=req.body.jobid;
	Job.findOne({'_id':id})
	.then(found =>{
		console.log(found);
		return res.json(found);
	}).
	catch(err=>{
		return res.json(err);
	});
});
router.post("/editjob",(req,res)=>{
	let reply={
		error: ""
	}
	const newmaximumapplications=req.body.newmaximumapplications;
	const newmaximumpositions=req.body.newmaximumpositions;
	const newdeadline=req.body.newdeadline;
	const id=req.body.jobid;
	Job.findOne({'_id':id}).then(user=>{
		user.deadline=newdeadline;
		user.maximumpositions=newmaximumpositions;
		user.maximumapplications=newmaximumapplications;
		Job.updateOne({'_id':id},user).then(found =>{
			reply.error="Noerror";
			return res.json(reply);
		})
		.catch(err1=>{
			return res.json(err1);
		});
	})
	.catch(err=>{
		return res.json(err);
	});
});
router.post("/Applicantjobview",(req,res)=>{
	let reply=[];
	let currdate=new Date().toISOString();
	let appid=req.body.applicantid;
	Job.find({'deadline':{$gt: currdate}})
	.then(found=>{
		const lent=found.length;
		let check=0;
		//console.table(found);
		if(found){
			found.map((data,index)=>{
				let curr={};
				curr.id=data._id;
				curr.title=data.title;
				curr.salary=data.salary;
				curr.duration=data.duration;
				curr.type=data.typeofjob;
				curr.deadline=data.deadline;
				curr.recruiterid=data.recruiterid;
				console.log(curr.recruiterid);
			//	if(curr.full){
			//		curr.status="full";
			//		reply.push(curr);
			//	}
			//	else{
				Appliedjob.findOne({'applicantid':appid,'jobid':data._id})
				.then(rep=>{
					if(data.posfull || data.appfull)
						curr.status="full";
					else if(rep){
						curr.status="applied";
					}
					else{
						curr.status="notapplied";
					}
					check=check+1;
				}).then(()=>{
					console.log(check);
					reply.push(curr);
					if(check==lent ){
						console.table(reply)
						return res.json(reply);
					}
				})
			//	}
			})
		}
		else{
			return res.json(reply);
		}
	})
	.catch(err=>{
		console.log(err);
		return res.json(err);
	})
})
module.exports = router;