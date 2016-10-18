import Ember from 'ember';

export default Ember.Component.extend({
  //["All Categories","Be Well::Children & Youth","Be Well::Adults","Feel Well::Adults","Feel Well::Children & Youth","Feel Well::Seniors","Be Well::Seniors","Eat Well::Children & Youth","Eat Well::Adults","Eat Well::Seniors","Move Well::Adults","Be Safe::Home Services","Move Well::Children & Youth","Move Well::Seniors","Events","Be Safe::Domestic Violence","Uncategorized"],
  categories: ["All", "Services", "Health & Care", "Education", "Food"],
  num: 5,

  list: function() {
    var query = this.get('query');
    var list = this.get('points');
    var tag_filter = this.get('tag_filter');

    if ((query && query.length > 2) || tag_filter) {
      list = list.filter(function(v) {
        return (query && v.description.match(new RegExp(query, 'i'))) || ( tag_filter && v.tags.join('::').match(new RegExp(tag_filter, 'i')));
      });
    }

    this.set('loading', false);
    this.set('results', list.length);
    return list;
  }.property('query', 'points', 'num', 'tag_filter'),

  list_restricted: function() {
    return this.get('list').slice(0, this.get('num'));
  }.property('list'),

  more_exist: function() {
    return (this.get('num') < this.get('results'));
  }.property('num', 'results'),

  on_text: function() {
    var self = this;
    clearTimeout(this.get('timeout') || 10000000000);
    this.set('timeout', setTimeout(function() {
      self.set('loading', true);
      self.set('query', self.get('search_by'));
      self.set('num', 5);
    }, 100));
  }.observes('search_by'),

  actions: {
    more() {
      this.set('num', this.get('num') + 5);
    },

    set_tag_filter(tag) {
      this.set('tag_filter', tag);
    }
  }
});

/* USED TO PARSE CATEGORIES */

/*
var cats= {};
for (var i in temp1) {
  if (temp1[i].categories) {
    var tempCats = temp1[i].categories.split(';');
    for (var j = 0; j < tempCats.length; j++)
      cats[tempCats[j]] = 1;
  }
}

var parsed = Object.keys(cats);
console.log(parsed);
*/


/* OLD CATEGORIES 
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
*/