import Ember from 'ember';

export default Ember.Controller.extend({
  medium: null,
  is_medium_text: Ember.computed.equal('medium', 'text'),
  is_medium_email: Ember.computed.equal('medium', 'email'),
  is_medium_mail: Ember.computed.equal('medium', 'mail'),
  is_medium_null: Ember.computed.equal('medium', null),

  loading: null,

  actions: {
    set_medium(medium) {
      this.set('medium', medium);
    },

    send() {
      this.set('loading', 'loading');
      var to;
      var medium = this.get('medium');

      switch(medium) {
        case 'text':
          to = this.get('phone');
        break;
        case 'email':
          to = this.get('email');
        break;
        case 'mail':
          to = `Nick Sahler%0A${this.get('street')}%0A${this.get('city')}, ${this.get('state')} ${this.get('zip')}`;
        break;
      }

      $.get(`http://localhost:3000/send/${medium}/${this.get('model.id')}?to=${to}`).then(function() {
        this.set('loading', 'sent');
      });
    }
  }
});
