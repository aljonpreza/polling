/**
 * Created by aljonp on 9/30/15.
 */
if (Meteor.isClient) {
  Template.pollForm.events({

    // handle the form submission
    'submit form': function(event) {

      // stop the form from submitting
      event.preventDefault();

      // get the data we need from the form
      var newPoll = {
        question: event.target.question.value,
        choices: [
          {  text: event.target.choice1.value, votes: 0 },
          {  text: event.target.choice2.value, votes: 0 },
          {  text: event.target.choice3.value, votes: 0 }
        ]
      };

      // create the new poll
      Polls.insert(newPoll);
    }

  });

  // attach events to our poll template
  Template.poll.events({

    // event to handle clicking a choice
    'click .vote': function(event) {

      // prevent the default behavior
      event.preventDefault();

      // get the parent (poll) id
      var pollID = $(event.currentTarget).parent('.poll').data('id');
      var voteID = $(event.currentTarget).data('id');

      // create the incrementing object so we can add to the corresponding vote
      var voteString = 'choices.' + voteID + '.votes';
      var action = {};
      action[voteString] = 1;

      // increment the number of votes for this choice
      Polls.update(
          { _id: pollID },
          { $inc: action }
      );

    }

  });
}