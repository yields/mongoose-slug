
/**
 * deps
 */

var slug = require('slug-component');

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
 *
 * @param {String} prop
 * @param {Object} options
 * @return {Function}
 */

module.exports = function(prop, opts){
  return (function slugize(schema){
    schema.add({ slug: String });
    schema.pre('save', function(next){
      var title = this[prop || 'title'];
      if (!title) return next(new Error(prop + ' is required to create a slug'));
      this.slug = slug(title, opts);
      next();
    });
  });
};
