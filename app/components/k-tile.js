import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNames: ["tile animated fadeInDown"],
  classNameBindings: ["module.link_to", "module.component"],

  click() {
    var l = this.get('module.link_to');
    if (l) {
      this.get('router').transitionTo(l);
    }
  }
});