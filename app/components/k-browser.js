import Ember from 'ember';

export default Ember.Component.extend({
  watch_url: function() {
    var self = this;
    Ember.run.debounce(this, function() {
      self.set('processed_url', self.get('url'));
    }, 400);
  }.observes('url'),

  // watch_processed_url: function() {
  //   this.set('url', this.get('processed_url'));
  // }.observes('processed_url'),

  processed_url: 'https://google.com'
});