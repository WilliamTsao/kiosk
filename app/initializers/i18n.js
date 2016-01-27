export default {
  name: 'i18n',

  after: 'ember-i18n',

  initialize(registry, app) {
    app.inject('component', 'i18n', 'service:i18n');
    registry.lookup('service:i18n').set('isSet', function() {
      return this.get('locale') !== 'unset';
    }.property('locale'));
  }
};