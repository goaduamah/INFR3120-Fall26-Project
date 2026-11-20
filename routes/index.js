
var express = require('express');
var router = express.Router();

// Import the shared ticket storage
var tickets = require('../data/tickets');

// Display the homepage
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Campus IT Help Desk' });
});


// Display the Campus IT Help Desk homepage
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Campus IT Help Desk' });
});

// Display the form for creating a new support ticket
router.get('/tickets/new', function(req, res, next) {
  res.render('new-ticket', {
    title: 'Create Ticket',
    success: req.query.success === '1'
  });
});


// Handle a submitted support ticket
router.post('/tickets', function(req, res, next) {

  // Get the information entered by the student
  var studentName = req.body.studentName;
  var email = req.body.email;
  var category = req.body.category;
  var description = req.body.description;

  // Check that all required fields have been entered
  if (!studentName || !email || !category || !description) {
    return res.status(400).send('Please complete all fields.');
  }

  // Create a new ticket record
  var newTicket = {
    id: Date.now(),
    studentName: studentName.trim(),
    email: email.trim(),
    category: category,
    description: description.trim(),
    status: 'Open'
  };

  // Save the ticket in the shared array
  tickets.push(newTicket);

      // Redirect after successful submission
      res.redirect('/tickets/new?success=1');


  

});


 // Display the ticket status dashboard
router.get('/dashboard', function(req, res) {
  res.render('dashboard', {
    title: 'Ticket Status Dashboard',
    tickets: tickets
  });
});


module.exports = router;
