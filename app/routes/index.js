import Ember from 'ember';

export default Ember.Route.extend({
  // beforeModel(){
  //   this.replaceWith('/reminders')
  // }
  model (){
    return this.get('store').findAll('reminder')
  }
});
