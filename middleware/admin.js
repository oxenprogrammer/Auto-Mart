/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */


// eslint-disable-next-line consistent-return
const admin = (req, res, next) => {
  // req.user from authorization
  if (!req.user.is_admin) return res.status(403).send({ status: 403, error: 'Access Denied' });
  return next();
};

export default admin;
