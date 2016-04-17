import Ember from 'ember';

export default Ember.Component.extend({
  page: Ember.computed('article', function() {
    return this.get('articles').splice(0,5);
  })
});