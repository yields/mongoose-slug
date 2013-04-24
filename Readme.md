
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

## License

MIT
