
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

  it('should populate `.slug` property', function(done){
    new Artist({ title: 'some artist' })
      .save(function(err, doc){
        if (err) return done(err);
        doc.slug.should.eql('some-artist');
        done();
      });
  })

  it('should return an error if the property does not exist', function(done){
    new Artist().save(function(err, doc){
      err.should.be.instanceOf(Error);
      err.message.should.include('[mongoose-slug]');
      done();
    });
  })

})
