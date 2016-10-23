import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  /* ---- Splash Screen ---- */
  timer: null,

  ready: function () {
    var self = this;

    var reset = ()=> {
      // 5 minutes
      var period = 1000 * 60 * 5;
      this.timer = setTimeout(this.onTimeout.bind(this), period);
    }.bind(this);

    reset();

    Ember.$('body').on('touchmove touchdown keydown mousedown mousemove', function (){
      clearTimeout(self.timer);
      reset();
    });
  },

  onTimeout() {
    this.__container__.lookup('route:application').transitionTo('splash');
  }
  /* ---- End Splash Screen ---- */

});

loadInitializers(App, config.modulePrefix);

export default App;
