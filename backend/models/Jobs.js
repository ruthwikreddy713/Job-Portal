const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const JobsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	nameofrecruiter: {
		type: String,
		required: true
	},
	emailofrecruiter: {
		type: String,
		required: true
	},
	recruiterid: {
		type: String,
		required: true
	},
	maximumapplications: {
		type: Number,
		required: true
	},
	maximumpositions: {
		type: Number,
		required: true
	},
	dateofposting: {
		type: String,
		required: true
	},
	deadline: {
		type: Date,
		required: true
	},
	requiredskills: {
		type: [String],
		required: false
	},
	typeofjob: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: false
	},
	salary: {
		type: Number,
		required: true
	},
	applications: {
		type: Number,
		required: false,
		default: 0
	},
	positions: {
		type: Number,
		required: false,
		default: 0
	},
	posfull:{
		type: Boolean,
		required: false,
		default:false
	},
	appfull:{
		type: Boolean,
		required: false,
		default: false
	},
	rating: {
		type: Number,
		required: false
	}
});
module.exports =  Job = mongoose.model('Jobs',JobsSchema)