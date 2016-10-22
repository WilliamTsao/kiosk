import Ember from 'ember';

export default Ember.Component.extend({

  tagName: "div",
  classNames: ["animated fadeInUp card language"],

  actions: {
    set_language( l ) {
      this.set('i18n.locale', l);
    }
  }
});
