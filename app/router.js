import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('videos', function() {
    this.route('index',{ path: '/' } );
    this.route('article', { path: '/:id' });
  });

  this.route('map', function() {
    this.route('index', { path: '/' });
    this.route('location', { path: '/:id' });

  });

  this.route('browser', { path: '/browser' });
  
  this.route('events');

  this.route('splash', function() {
    this.route('index', { path: '/' });
  });

  this.route('entity', { path: '/entity/:id' } );
  this.route('emergency-services');
});

export default Router;