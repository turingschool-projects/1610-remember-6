import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    updateNote(id) {
      this.get('store').findRecord('reminder', id).then(function(reminder) {
        reminder.set('title', reminder.get('title'))
        reminder.set('date', reminder.get('date'))
        reminder.set('notes', reminder.get('notes'))
        reminder.save();
      }).then(()=>{
        this.transitionToRoute('/reminders/' + this.model.id)
      })
    }
  }
});
