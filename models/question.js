var mongoose = require('mongoose'),
	Answer = require('./answer'),
	Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	title: String,
	body: String,
	answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});

var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;