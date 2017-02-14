import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

    title: '',
    date: '',
    notes: '',

  actions: {
    updateNote(id) {
      const reminderProps = this.getProperties('title', 'date', 'notes');
      this.get('store').findRecord('reminder', id).then(function(reminder) {
        reminder.set('title', reminderProps.title)
        reminder.set('date', reminderProps.date)
        reminder.set('notes', reminderProps.notes)
        reminder.save();
      }).then(() => {
        this.setProperties({title: '', date: '' , notes: ''})
      }).then(()=>{
        this.transitionToRoute('/reminders/' + this.model.id)
      })
    }
  }
});
