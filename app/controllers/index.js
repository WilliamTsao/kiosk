import Ember from 'ember';

export default Ember.Controller.extend({
  language: null,

  actions: {
    set_language( l ) {
      this.set('language', l);
    }
  }
});
