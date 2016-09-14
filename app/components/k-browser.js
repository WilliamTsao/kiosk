import Ember from 'ember';

export default Ember.Component.extend({
  watch_url: function() {
    this.set('displayed_url', this.get('url'));
  }.observes('url'),

  url: 'https://google.com',
  displayed_url: 'https://google.com',

  actions: {
    back() {
      document.getElementsByTagName('webview')[0].goBack();
    },

    forward() {
      console.log(document.getElementsByTagName('webview')[0])
      document.getElementsByTagName('webview')[0].goForward()
    },

    go() {
      this.set('url', this.get('displayed_url'));
    }
  }
});