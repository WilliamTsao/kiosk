import Ember from 'ember';

export default Ember.Component.extend({
  //["All Categories","Be Well::Children & Youth","Be Well::Adults","Feel Well::Adults","Feel Well::Children & Youth","Feel Well::Seniors","Be Well::Seniors","Eat Well::Children & Youth","Eat Well::Adults","Eat Well::Seniors","Move Well::Adults","Be Safe::Home Services","Move Well::Children & Youth","Move Well::Seniors","Events","Be Safe::Domestic Violence","Uncategorized"],
  categories: ["All", "Services", "Health & Care", "Education", "Food"],
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