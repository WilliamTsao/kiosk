import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
   return Ember.RSVP.hash({
      datapoints: Ember.$.get('http://api.innovatenb.org/entities').then(function(data) {
        return data.filter(function(item) {
          return ( params.filter ) ? item.categories.includes(params.filter) : true;
        });
      })
    });
  },
});
