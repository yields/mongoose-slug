
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
    schema.path(prop || 'title').set(function(v){
      this.slug = slug(v, opts);
    });
  });
};
