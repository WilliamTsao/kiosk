import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {   
    url: {
      refreshModel: true,
      replace: true,
      as: 'url'
    }
  },

  model(params) {
    return params;
  }
});