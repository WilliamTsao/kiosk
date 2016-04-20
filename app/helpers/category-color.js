import Ember from 'ember';

export function categoryColor(params/*, hash*/) {

  var colors = {
    "All Categories": "#001F3F",
    "Be Well::Children & Youth": "#0074D9",
    "Be Well::Adults": "#7FDBFF",
    "Feel Well::Adults": "#39CCCC",
    "Feel Well::Children & Youth": "#3D9970",
    "Feel Well::Seniors": "#2ECC40",
    "Be Well::Seniors": "#01FF70",
    "Eat Well::Children & Youth": "#FFDC00",
    "Eat Well::Adults": "#FF851B",
    "Eat Well::Seniors": "#FF4136",
    "Move Well::Adults": "#F012BE",
    "Be Safe::Home Services": "#B10DC9",
    "Move Well::Children & Youth": "#85144B",
    "Move Well::Seniors": "#FFFFFF",
    "Events": "#DDDDDD",
    "Be Safe::Domestic Violence": "#AAAAAA",
    "Uncategorized": "#111111"
  };

  var list = params[0].categories.split(';');
  return colors[list[list.length - 1]]
}

export default Ember.Helper.helper(categoryColor);
