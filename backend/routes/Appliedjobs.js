var express= require("express");
var router = express.Router();
const Appliedjob = require("../models/Appliedjobs");
const Jobapplicant=require("../models/Jobapplicants");
const Jobrecruiter=require("../models/Jobrecruiters");
const Job=require("../models/Jobs");
router.get("/jobdets",function(req, res) {
	console.log("ok");
	//const id=req.body.applicantid;
	//const jobid=req.body.jobid;
	Appliedjob.find()
	.then(jobrecruiters=>{
		return res.json(jobrecruiters);
	})
	.catch(err=>{
		return res.json(err);
	})
});
router.post("/add",(req,res)=> {
	console.log("hehe");
	const newjob= new Appliedjob ({
		jobid: req.body.jobid,
		recruiterid: req.body.recruiterid,
		applicantid: req.body.applicantid,
		sop: req.body.sop
	});
	let rely={
		error: ""
	};
	Jobapplicant.findOne({'_id':newjob.applicantid})
	.then(reply=>{
		if(reply.accepted){
			console.log("wait what");
			rely.error="accepted";
			return res.json(rely);
		}
		else{
			Appliedjob.findOne({'jobid':newjob.jobid,'applicantid':newjob.applicantid})
			.then(result=>{
				if(!result){
					console.log("near save");
					newjob.save()
					.then(resultf=>{
						Job.findOne({'_id':newjob.jobid})
						.then(otp=>{
							let appup=otp;
							appup.applications=otp.applications+1;
							if(appup.applications==appup.maximumapplications){
								appup.appfull=true;
							}
							Job.updateOne({'_id':newjob.jobid},appup)
							.then(suc=>{
								rely.error="1";
								console.log(rely.error);
								return res.json(rely);
							})
						})
					})
					.catch(err=>{
						rely.error="save";
						console.log(rely.error);
						return res.json(rely);
					});
				}
				else{
					rely.error="exists";
					console.log(rely);
					return res.json(rely);
				}
			})
			.catch(err=>{
				console.log(err);
				return res.json(err);
			})
		}
	})
	.catch(err=>{
		console.log(err);
	})
});

router.post("/updatestatus",(req,res)=>{
	console.log("cool");
	const jobid = req.body.jobid;
	const applicantid=req.body.applicantid;
	const newstatus = req.body.newstatus;
	if(newstatus!="accepted"){
		Appliedjob.findOne({'jobid':jobid,'applicantid':applicantid})
		.then(found=>{
			if(found){
				found.status=newstatus;
				const id=found._id;
				console.log(found);
				Appliedjob.updateOne({'_id':id},found)
				.then(success=>{
					console.log(suc);
					return res.json(success);
				})
				.catch(err=>{
					return res.json(err);
				});
			}
		})
		.catch(err=>{
			return res.json(err);
		});
	}
	else{
		console.log("Niga");
		Appliedjob.findOne({'jobid':jobid,'applicantid':applicantid})
		.then(found=>{
			if(found){
				let check=0;
				let lent=0;
				//console.log(lent);
				found.status=newstatus;
				const id=found._id;
				Job.findOne({'_id':jobid})
				.then(out=>{
					console.log(out.full);
					if(out.posfull){
						return res.send("3");
					}
					else{
				console.log(found);
				Appliedjob.updateOne({'_id':id},found)
				.then(success=>{
					//console.log(suc);
					Job.findOne({'_id':jobid})
					.then(jobf=>{
						let newjobs=jobf;
						newjobs.positions=jobf.positions+1;
						if(newjobs.positions == newjobs.maximumpositions)
							newjobs.posfull=true;
						Job.updateOne({'_id':jobid},newjobs)
						.then(()=>{
						Jobapplicant.findOne({'_id':applicantid})
						.then(resp=>{
							resp.accepted=true;
								console.log(applicantid);
							console.log(jobid);
							Jobapplicant.updateOne({'_id':applicantid},resp)
							.then(respo=>{
								Appliedjob.find({'applicantid':applicantid,'jobid':{$ne: jobid}})
								.then(output =>{
									console.log("output here")
									lent=output.length;
									console.log(output.length);
									if(output.length){
										console.log("opdrawn");
										output.map((data,index)=>{
											console.log("check22");
											data.status="rejected";
											const id=data._id;
											Appliedjob.updateOne({'_id':id},data)
											.then(response=>{
												check=check+1;
												console.log("applied");
												console.log(check);
												if(check==lent){
													console.log("OKreturned");
													return res.json(success);
												}
												//return res.json({lol:'12'});
											})
										})
										//return res.json(output);
									}
									else{
										return res.json(output);
									}
								})
						})
					//	return res.json(success);
					})
			})
					})
				})						
					}
				})

			}
		})
		.catch(err=>{
			console.log(err);
			return res.json(err);
		})	
		}	
});
router.post("/applicantapplications",(req,res)=>{
	const applicantid=req.body.applicantid;
	Appliedjob.find({'applicantid':applicantid})
	.then(found=>{
		console.table(found);
		return res.json(found);
	})
	.catch(err=>{
		return res.json(err);
	});
});
router.post("/acceptedapplicants",(req,res)=>{
	const recruiterid=req.body.recruiterid;
	console.log("ok");
	let reply={
		data: []
	}
	let op=[];
	const checkstr="accepted";
	Appliedjob.find({'recruiterid':recruiterid, 'status':checkstr})
	.then(found=>{
		console.table(found);
		const lent=found.length;
		let check=0;
		if(found){
			found.map((data,index)=>{
				console.log(data);
				let obj={};
				obj.status=data.status;
				Job.findOne({'_id':data.jobid}).then(resp=>{
					console.log(resp);
					obj.title=resp.title;
					obj.type=resp.typeofjob;
					obj.date=resp.deadline;
				})
				.then(()=>{
				Jobapplicant.findOne({'_id':data.applicantid})
				.then(found=>{
					//console.log(obj);
					obj.name=found.name;
					check=check+1;
				})
				.then(()=>{
					console.log(obj);
					op.push(obj);
					reply.data.push(obj);
					console.table(reply.data);
					if(check == lent){
						return res.json(reply);
					}
				})
			})
			})
		}
		else{
			let reply={error: "what"};
			return res.json(reply);
		}
	})
	.catch(err=>{
		return res.json(err);
	})
});
router.post("/unrejectedjobs",(req,res)=>{
	const recruiterid=req.body.recruiterid;
	const jobid=req.body.jobid;
	const str="rejected";
	Appliedjob.find({recruiterid:recruiterid,jobid:jobid,status:{$ne: str}})
	.then(found=>{
		if(found){
			console.log("okie");
			console.table(found);
        //    {found.data.map((data,index)=>{
        //       console.log(data);
        //    });};
			return res.json(found);
		}
		else{
			console.log("ce");
			return res.send("0");
		}
	})
	.catch(err=>{
		return res.json(err);
	});
});
router.post("/checkifapplied",(req,res)=>{
	const jobid=req.body.jobid;
	let reply={error: ''};
	const applicantid=req.body.applicantid;
	Appliedjob.findOne({applicantid:applicantid,jobid:jobid})
	.then(found=>{
		if(found){
			reply.error="None";
			return res.json(reply);
		}
		else{
			reply.error="Notexisting";
			return res.json(reply);
		}
	})
	.catch(err=>{
		reply.error="findfailed";
		return res.json(reply);
	})
});
module.exports = router;