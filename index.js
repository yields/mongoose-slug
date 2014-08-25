
/**
 * deps
 */

var slug = require('speakingurl');

/**
 * slug plugin.
 *
 * Usage:
 *
 *      mySchema.plugin(slug('title'));
 *
 * Options:
 *
 *      - `.replace` characters to replace defaulted to `[^a-zA-Z]`
 *      - `.separator` separator to use, defaulted to `-`
 *      - `required` whether a slug is required, defaults to `true`
 *
 * @param {String} prop
 * @param {Object} options
 * @return {Function}
 */

module.exports = function(prop, opts){
  return (function slugize(schema){
    var title;
    schema.add({
      slug: {
        type: 'String',
        unique: (opts && opts.unique) ? true : false
      }
    });

    if (opts && opts.track) {
      schema.add({ slugs: [ String ] });
    }

    schema.pre('save', function(next){
      var self = this;

      if (prop && Array.isArray(prop)) {
        var titles = [];
        prop.forEach(function(el){
          titles.push(self[el]);
        });
        title = titles.join(' ');
      } else {
        title = this[prop || 'title'];
      }

      var require = (opts && opts.required === false) ? false : true
        , presets = (opts && opts.override) ? true : false;

      if (require && !title) return next(new Error(prop + ' is required to create a slug'));

      var mySlug = slug(title, opts);
      if (opts && opts.track && self.slugs && self.slugs.indexOf( mySlug) == -1) self.slugs.push( mySlug );
      if (title && !self.slug) self.slug = mySlug;

      next();
    });
  });
};
