import Ember from 'ember';

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

export default Ember.Component.extend({
  tagName: 'canvas',
  socketIOService: Ember.inject.service('socket-io'),
  attributeBindings: ['width', 'height'],
  width: 512,
  height: 512,

  didInsertElement() {
    var canvas = this.$()[0];
    var ctx = canvas.getContext('2d');
    this.ctx = ctx;
    var self = this;

    (function animloop(){
      window.requestAnimFrame(animloop);
      self.draw();
    })();

    const socket = this.get('socketIOService').socketFor('ws://localhost:4201/');

    socket.on('connect', this.onConnect, this);
    socket.on('controls', this.onMessage, this);
  },

  onConnect() {
    console.log('connected');
  },

  onMessage(data) {
    this.set('dir', Math.abs((this.get('dir') + ((data['control'] === 'left') ? -1 : 1) + 4) % 4) );
  },

  dir: 0,
  next_update: 0,

  tail: [[5,5], [5,4], [5,3], [5,2]],

  snack: [5,5],

  draw() {
    var size = 30;
    var scale = this.get('width') / size;
    var ctx = this.ctx;
    var moves = [[-1,0],[0,-1],[1,0],[0,1]];
    var snack = this.get('snack');

    if (this.get('next_update') <= Date.now()) {
      ctx.fillStyle = "rgb(255,255,255)"; 
      ctx.clearRect(0,0, this.get('width'), this.get('height'));

      this.set('next_update', Date.now() + 100);
      var tail = this.get('tail');

      var prev = [tail[0][0], tail[0][1]];
      var move = moves[this.get('dir')];

      if (snack[0] === tail[0][0] + move[0] && snack[1] === tail[0][1] + move[1]) {
        tail.unshift([snack[0], snack[1]]);
        this.set('snack', [Math.floor(Math.random() * size), Math.floor(Math.random() * size)]);
      }

      tail[0][0] += move[0];
      tail[0][1] += move[1];

      tail[0][0] = Math.min( Math.max(tail[0][0], 0), size - 1 );
      tail[0][1] = Math.min( Math.max(tail[0][1], 0), size - 1 );
      var i = 0;

      do { 
        if (i !== 0) { 
          var temp = tail[i];
          tail[i] = prev;
          prev = [temp[0], temp[1]];
        }

        ctx.fillStyle = "rgb(255," + ((i / size) * 255) + "," + ((i / size) * 255) + ")"; 
        ctx.fillRect(tail[i][0] * scale, tail[i][1] * scale, scale, scale);
        i++;
      } while (i < tail.length);
    }

    ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`; 
    ctx.fillRect(snack[0] * scale, snack[1] * scale, scale, scale);

  },
});