import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // From https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://blog.nj.com/middlesex_impact/rss.xml&num=20
    return Ember.RSVP.hash({
      news: Ember.$.get( '/news.json' ).then(
        function(data) {
          return  data.responseData.feed.entries;
        }),
      mapdata: Ember.$.get('/data.json')
    });
  }
});
