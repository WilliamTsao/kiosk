import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    interact: function() {
      this.transitionTo('index');
      console.log('ok');
    }
  }
});
