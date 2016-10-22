import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    set_selected(video) {
      this.set('selected', video);
    }
  }
});
