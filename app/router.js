import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('news', function() {
    this.route('index', { path: '/' });
    this.route('article', { path: '/:id' });
  });

  this.route('map', function() {
    this.route('index', { path: '/' });
    this.route('location', { path: '/:id' });
  });

  this.route('send', { path: '/send/:id' } );
  this.route('browse', {path: '/browse'});
});

export default Router;
