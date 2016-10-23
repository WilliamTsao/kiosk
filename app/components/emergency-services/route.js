import Ember from 'ember';

export default Ember.Route.extend({
	
	model() {
		return Ember.$.getJSON("./kiosk_manifest.json").then(function(data) {
			return Ember.$.getJSON(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${data.location.latitude},${data.location.longitude}`);
		})
	}
});