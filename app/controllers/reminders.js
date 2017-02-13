import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    remove(id) {
      this.get('store').findRecord('reminder', id, {
        backgroundReload: false }).then(function(post) {
        post.destroyRecord();
      }).then(()=>{
        this.transitionToRoute('reminders')
      })
    }
  }
});
