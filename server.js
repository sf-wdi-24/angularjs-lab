// require express and other modules
var express = require('express'),
    app = express(),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Question = require('./models/question'),
    Answer = require('./models/answer');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/qa'
);

app.get('/api/questions', function (req, res) {
	Question.find(function (err, allQuestions) {
	    if (err) {
	      res.status(500).json({ error: err.message });
	    } else {
	      res.json(allQuestions);
	    }
	});
});

app.post('/api/questions', function (req, res) {
	var newQuestion = new Question(req.body);
	newQuestion.save(function (err, savedQuestion) {
		if (err) {
		  res.status(500).json({ error: err.message });
		} else {
		  res.json(savedQuestion);
		}
	});
});

app.post('/api/answers', function (req, res) {
	var newAnswer = new Answer(req.body);
	var questionId = req.body.question_id;
	Question.findOne({_id: questionId}, function(err, foundQuestion){
		if(err){console.error(err);}
	    else {
	    	newAnswer.save(function (err, savedAnswer) {
				if (err) {
				  res.status(500).json({ error: err.message });
				} else {
					foundQuestion.answers.push(savedAnswer);
					foundQuestion.save();
					res.json(savedAnswer);
				}
			});
	    }
	});
	
});

app.get('/api/questions/:id', function (req, res) {
	Question.find({_id: req.params.id})
		.populate('answers')
          .exec(function(err, foundQuestion){
          	console.log(foundQuestion);
              res.json(foundQuestion);
          });
});

app.put('/api/questions/:id', function (req, res) {
  
});

app.delete('/api/questions/:id', function (req, res) {
	console.log(req.params.id);
	Question.remove({_id: req.params.id}, function(err, deletedQuestion){
	    if(err){console.error(err);}
	    else {
	    	console.log(deletedQuestion);
	      res.json(deletedQuestion);
	    }
  	});
});

// Catch all server route
app.get('*', function (req, res) {
  res.render('index');
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});