import Ember from 'ember';

const reminder = [1,2,3,4,5]

export default Ember.Route.extend({
  model(){
    return reminder
  }
});
