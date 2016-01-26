var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AnswerSchema = new Schema({
	title: String,
	body: String
});

var Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;