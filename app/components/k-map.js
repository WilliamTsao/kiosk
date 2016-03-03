import Ember from 'ember';

export default Ember.Component.extend({
  categories: [
    {
      tag: 'food',
      icon: '🍕'
    },
    {
      tag: 'bars',
      icon: '🍷'
    },
    {
      tag: 'cats',
      icon: '🐱'
    }
  ]
});
