
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
 * @param {String} prop
 * @return {Function}
 */

module.exports = function(prop){
  return (function slugize(schema){
    schema.add({ slug: String });
    schema.pre('save', function(next){
      prop = prop || 'title';
      var title = this[prop];
      if (title) return this.slug = slug(title), next();
      next(new Error('[mongoose-slug]: Cannot create a slug property `'
        + (prop || 'title') + '` is missing.'));
    });
  });
};
