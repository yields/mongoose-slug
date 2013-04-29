
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , model = mongoose.model.bind(mongoose)
  , slug = require('..')
  , schema = Schema({ title: String, baz: String }).plugin(slug())
  , Artist = model('Artist', schema)
  , to = require('./db');

describe('mongoose-slug', function(){

  before(function(){
    mongoose.connect(to);
  })

  it('should create the slug', function(done){
    new Artist({ title: 'some artist'})
    .save(function(err, doc){
      if (err) return done(err);
      doc.title.should.eql('some artist');
      doc.slug.should.eql('some-artist');
      done();
    })
  })

  after(function(done){
    Artist.remove({
      title: 'some artist'
    }, done);
  })

})
