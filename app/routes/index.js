import Ember from 'ember';

export default Ember.Route.extend({
  model() { 
    return Ember.$.getJSON('./kiosk_manifest.json');
  }
});
