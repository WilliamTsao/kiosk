import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
   return Ember.$.get(`http://api.innovatenb.org/entities/${params.id}`);
  },
});
