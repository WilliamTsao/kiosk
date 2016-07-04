export function initialize(app) {
  app.inject('component', 'i18n', 'service:i18n');
  app.inject('controller', 'i18n', 'service:i18n');
  app.inject('view', 'i18n', 'service:i18n');

  var owner = app.__container__.owner;

  owner.lookup('service:i18n').set('isSet', function() {
    return this.get('locale') !== 'unset';
  }.property('locale'));

  owner.lookup('service:i18n').set('names', {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français'
  });

  owner.lookup('service:i18n').set('name', function( locale ) {
    return this.get('names')[locale];
  });
}

export default {
  name: 'i18n',
  after: 'ember-i18n',
  initialize: initialize
};