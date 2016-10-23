import Ember from 'ember';

export default Ember.Component.extend({
  other_is_clicked: false,
  scenario_is_clicked: false,
  car_checked: false,
  situation: "",
  phones:{
    police: '+1 609-937-3562',
    fire: '+1 908-803-8835',
    ambulance: '+1 848-667-5394'
  },

  appears:{
    police: false,
    fire: false,
    ambulance: false
  },



  actions: {
    

    selected(scenario, police, ambulance, fire){
      
        //reset flags
        this.set('appears.police', false);
        this.set('appears.fire', false);
        this.set('appears.ambulance', false);

      this.set('situation', scenario);
      this.set('scenario_is_clicked', true);

      if(police){
        this.set('appears.police', true);
      }
      if(ambulance){
        this.set('appears.ambulance', true);
      }
      if(fire){
        this.set('appears.fire', true);
      }

      if(scenario == "Other"){
        this.set('other_is_clicked', true);
        this.set('situation', this.get('model.message'));
      }

    },

/*
    show_other(){
        //reset flags
        this.set('appears.police', false);
        this.set('appears.fire', false);
        this.set('appears.ambulance', false);
      this.set('other_is_clicked', true);

    
    },
*/
    sendMsg() {
      console.log(this.get('emergency_text'));
      this.set('other_is_clicked', false);
    },

    cancelMsg() {
      this.set('other_is_clicked', false);
    },


    send(phone) {
      Ember.$.get('http://localhost:3000/', {responderNum: phone, situation: this.get("situation"), location: this.get("model").results[0]['formatted_address'] });
    },
    sendPolice() {
      this.set('send_police', true);
      alert("The Police is on the way!");
      this.send('send', this.get('phones.police'));
    },
    sendAmbulance() {
      this.set('send_ambulance', true);
      alert("The Ambulance is on the way!");
      this.send('send', this.get('phones.ambulance'));
    },
    sendFire() {
      this.set('send_fire', true);
      alert("The Fire Department is on the way!");
      this.send('send', this.get('phones.fire'));
    },

    backPage(){
      this.set('scenario_is_clicked', false);
      this.set('other_is_clicked', false);
      this.set('send_police', false);
      this.set('send_fire', false);
      this.set('send_ambulance', false);
        
    }

  }


});
