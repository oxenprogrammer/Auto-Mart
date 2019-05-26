/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

const filterValue = (obj, key, value) => obj.filter(v => v[key] === value);

export default filterValue;
