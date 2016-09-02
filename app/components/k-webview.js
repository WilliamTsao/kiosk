import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'webview',
  attributeBindings: ['src', 'allowfullscreen'],
  src: 'http://google.com',
  allowfullscreen: '',

  didInsertElement() {
    var self = this;
    this.get('element').addEventListener('did-navigate', function(e) { console.log(e); self.set('src', e.url); });
  }
});
