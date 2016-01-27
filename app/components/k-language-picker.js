import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    set_language( l ) {
      this.set('i18n.locale', l);
    }
  }
});
