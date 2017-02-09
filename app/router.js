import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
<<<<<<< HEAD
  this.route('reminders');
=======
  this.route('/');
  this.route('reminders', function(){
    this.route('index', { path: '/' });
    this.route('reminder', { path: '/:id' });
  });
>>>>>>> d0186d1... create nested route for individual notes
});

export default Router;
