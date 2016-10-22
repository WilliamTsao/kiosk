import Ember from 'ember';

export default Ember.Component.extend({

  displayed_url: function() {
    return  this.get('model.url');
  }.property('model.url'),

  actions: {
    back() {
      document.getElementsByTagName('webview')[0].goBack();
    },

    forward() {
      console.log(document.getElementsByTagName('webview')[0]);
      document.getElementsByTagName('webview')[0].goForward();
    },

    go() {
      this.set('model.url', this.get('displayed_url'));
    }
  }
});