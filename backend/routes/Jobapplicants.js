var express= require("express");
var router = express.Router();
const Jobapplicant = require("../models/Jobapplicants");

//GET to get all users
router.get("/",function(req, res) {
	Jobapplicant.find(function(err, jobapplicants){
		if(err) {
			console.log(err);
		}
		else {
			res.json(jobapplicants);
		}
	})
});
/*router.get("/",function(req, res) {
    Jobapplicant.find(function(err, users) {
        if (err)
            console.log(err);
        else {
            console.log(users);
            res.json(users);
        }
    });
});*/
//POST to add 
router.post("/register", (req,res) =>  {
	const newJobapplicant = new Jobapplicant({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		education: "",
		skills: "",
		rating: "" 
	});
	let reply={
		error: ""
	};
	const email = newJobapplicant.email;
	if(!email || !newJobapplicant.name || !newJobapplicant.password){
		reply.error = "Fields empty";
		return res.json(reply);
	}
	Jobapplicant.findOne({email}).then(user => {
		if(!user){
			newJobapplicant.save()
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
	Jobapplicant.findOne({email}).then(user => {
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
	const neweducation = req.body.neweducation;
	const newskills = req.body.newskills;
	let reply= {
		error: ""
	}
	Jobapplicant.findOne({"_id": id}).then(user => {
		if(user){
			user.name=newname
		//	return res.json(user);
			if(user.email == newemail){
		//		user.name == newname;
				user.email = newemail;
				user.education = neweducation;
				user.skills = newskills;	
			//	return res.json(user);
				Jobapplicant.updateOne({'_id':id},user)
				.then(user2 =>{
					reply.error="None";
					return res.json(reply);
				})	
				.catch(err =>{
					reply.error="Can't update";
					return res.json(reply);
				});	
			}
			Jobapplicant.findOne({'email': newemail})
			.then(userf => {
				if(!userf){
					user.name=newname;
					user.email = newemail;
					user.education = neweducation;
					user.skills = newskills;
					Jobapplicant.updateOne({'_id':id},user)
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
					if(user.email == newemail && user.name == newname){
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
	Jobapplicant.findOne({'_id':id})
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
module.exports = router;