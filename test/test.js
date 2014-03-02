
var mongoose = require('mongoose')
  , should = require('should')
  , Schema = mongoose.Schema
  , model = mongoose.model.bind(mongoose)
  , slug = require('..')
  , to = require('./db');

describe('mongoose-slug', function(){

  before(function(){
    mongoose.connect(to);
  });

  it('should create the slug with default source property(title)', function(done){
    var schema = Schema({ title: String, baz: String }).plugin(slug())
    , Artist = model('Artist', schema);
  
    new Artist({ title: 'some artist'})
    .save(function(err, doc){
      if (err) return done(err);
      doc.title.should.eql('some artist');
      doc.slug.should.eql('some-artist');
      done();
    });
  });

  it('should create the slug with utf8 converted into latin chars', function(done){
    var schema = Schema({ title: String, baz: String }).plugin(slug())
    , Thing = model('Thing', schema);
  
    new Thing({ title: 'Schöner Titel läßt grüßen!? Bel été !'})
    .save(function(err, doc){
      if (err) return done(err);
      doc.title.should.eql('Schöner Titel läßt grüßen!? Bel été !');
      doc.slug.should.eql('schoener-titel-laesst-gruessen-bel-ete');
      done();
    });
  });

  it('should create the slug with multiple source property', function(done){
    var personSchema = Schema({ name: String, occupation: String }).plugin(slug(['name', 'occupation']))
    , Person = model('Person', personSchema);
  
    new Person({ name: 'John Doe', occupation: 'Scam Artist'})
    .save(function(err, doc){
      if (err) return done(err);
      doc.name.should.eql('John Doe');
      doc.occupation.should.eql('Scam Artist');
      doc.slug.should.eql('john-doe-scam-artist');
      done();
    });
  });

  after(function(done){
    model('Artist').remove({
      title: 'some artist'
    }, function () {
      model('Person').remove({
        name: 'John Doe'
      }, done)
    });
  });

});
