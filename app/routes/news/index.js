import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // From https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://blog.nj.com/middlesex_impact/rss.xml&num=20
    return {
      news: [],
      videos: [
        'I2jmxQ3_zGg',
        '0KW4oZk-MMY',
        'd42xevS6Lqk',
        'CWF8R9Ta2eM',
        'oXYMG5LOQ2Q'
      ]
    };
  }
});
