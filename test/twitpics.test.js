/** module dependencies */
var vows = require('vows')
  , assert = require('assert');

/** test module */
var twitpics = require('../lib/twitpics');

/** test suites */
vows.describe('Test twitpics').addBatch({
  'search': {
    topic: function() {
      twitpics.search('hakobera', 1, this.callback);
    },

    'returns images info of user': function(err, images) {
      console.log(images);
      assert.equal(images.length, 7);
    }
  }
}).export(module);