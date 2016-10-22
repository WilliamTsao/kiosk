import Ember from 'ember';

export default Ember.Component.extend({
  application: Ember.getOwner(this),

  medium: null,
  is_medium_text: Ember.computed.equal('medium', 'text'),
  is_medium_email: Ember.computed.equal('medium', 'email'),
  is_medium_mail: Ember.computed.equal('medium', 'mail'),
  is_medium_null: Ember.computed.equal('medium', null),

  loading: null,

  is_sent: Ember.computed.equal('loading', 'sent'),
  is_loading: Ember.computed.equal('loading', 'loading'),

  not_editing: function() {
    return !this.get('editing');
  }.property('editing'),

  actions: {
    set_medium(medium) {
      this.set('medium', medium);
    },

    send() {
      var self = this;

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

      Ember.$.get(`http://api.innovatenb.org/send/${medium}/${this.get('model.id')}?to=${to}`)
        .then(function() {
          self.set('loading', 'sent');
        });
    },

    reset() {
      this.set('loading', null);
    },

    edit() {
      this.set('editing', true);
    },

    save() {
      this.set('editing', false);
      var x = this.get('model');
      Ember.$.ajax({
        url: `http://api.innovatenb.org/entities/${this.get('model.id')}?token=${this.get('application.admin')}`,
        type: "POST",
        contentType : 'application/json',
        data: JSON.stringify({
          id: x.id,
          name: x.name,
          description: x.description,
          tags: x.tags,
          address: x.address,
          location: x.location,
          phone: x.phone,
          url: x.url,
          image_url: x.image_url,
          icon_url: x.icon_url
        })
      });
    }
  }
});