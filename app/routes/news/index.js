import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // From https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://blog.nj.com/middlesex_impact/rss.xml&num=20
    return {
      news: [],
      videos: [
        { id:'I2jmxQ3_zGg', title: 'Dr. Dan Su and Mario Vargas (PRAB) on Prostate Cancer and Screenings'},
        { id:'0KW4oZk-MMY', title: 'Training Run: Tour of New Brunswick NJ'},
        { id:'d42xevS6Lqk', title: 'New Brunswick: 2050 - A New Vision'},
        { id:'CWF8R9Ta2eM', title: 'Man vs Food S02E19 New Brunswick, NJ'},
        { id:'oXYMG5LOQ2Q', title: 'Rutgers University Anthem Video for New Students 2015'}
      ]
    };
  }
});
