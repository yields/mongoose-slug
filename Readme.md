
## mongoose-slug

a simple mongoose plugin that populates `.slug` when the given `prop` is set.

## installation

```bash
$ npm install mongoose-slug
```

## Usage

```js
var slug = require('mongoose-slug');
schema.plugin(slug('name'));
var Song = mongoose.model('Song', schema);

var song = new Song();
song.name = 'frank ab';
song.slug; // > frank-ab
```

To use different slug candidates pass them as array

```js
var slug = require('mongoose-slug');
schema.plugin(slug(['firstName', 'lastName']));
var Person = mongoose.model('Person', schema);

var person = new Person({firstName: 'John', lastName: 'Doe'});

person.save(function(err, person) {
person.slug; // > john-doe	
});

````

## License

MIT
