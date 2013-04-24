
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , model = mongoose.model.bind(mongoose)
  , slug = require('..')
  , schema = Schema({ title: String }).plugin(slug())
  , Artist = model('Artist', schema)
  , to = require('./db');

describe('mongoose-slug', function(){

  before(function(){
    mongoose.connect(to);
  })

  it('should populate `.slug` property', function(){
    var artist = new Artist({ title: 'some artist '});
    artist.slug.should.eql('some-artist');
  })

})
