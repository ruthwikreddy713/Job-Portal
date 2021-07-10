const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const AppliedjobSchema = new Schema({
	jobid: {
		type: String,
		required: true
	},
	recruiterid: {
		type: String,
		required: true
	},
	applicantid: {
		type: String,
		required: true
	},
	sop: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: false,
		default: "applied"
	}
});
module.exports =  Appliedjob = mongoose.model('Appliedjobs',AppliedjobSchema)