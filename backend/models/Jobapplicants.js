const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const JobappliacantSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	education: {
		type : [Object],
		required: false
	},
	skills: {
		type: [String],
		required: false
	},
	rating: {
		type: Number,
		required: false
	},
	accepted:{
		type: Boolean,
		required: false,
		default: false
	}
});
module.exports =  Jobappliacant = mongoose.model('Jobappliacants',JobappliacantSchema)