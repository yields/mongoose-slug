
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
 *      - `required` whether a slug is required, defaults to `true`
 *
 * @param {String} prop
 * @param {Object} options
 * @return {Function}
 */

module.exports = function(prop, opts){
  return (function slugize(schema){
		var title;
    schema.add({ slug: String });
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
			
      var require = (opts && !opts.required) ? false : true;
      if (require && !title) return next(new Error(prop + ' is required to create a slug'));
      if (title) self.slug = slug(title, opts);
      next();
    });
  });
};
