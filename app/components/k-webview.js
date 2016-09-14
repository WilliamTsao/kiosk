import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'webview',
  attributeBindings: ['src', 'url', 'allowfullscreen'],
  src: '',
  url: 'http://google.com',
  allowfullscreen: '',
  
  init() {
    this._super();
    this.set('src', this.get('url'));
  },

  didInsertElement() {
    var self = this;
    this.get('element').addEventListener('did-navigate', function(e) { 
      console.log("TEST " + self.readDOMAttr('src'));

      self.set('url', e.url);

      if ( self.readDOMAttr('src') !== self.get('src') ) {
        self.set('src', self.readDOMAttr('src'));
      }
    });
  },

  watch_url: function() {
    console.log("URL UPDATED" + this.get('url'));
    this.set('src', this.get('url'));
  }.observes('url')
});
