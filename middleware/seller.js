/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

// eslint-disable-next-line consistent-return
const seller = (req, res, next) => {
  // req.user from authorization
  if (req.user.user_class !== 'SELLER')
    return res.status(403).send({ status: 403, error: 'Access Denied' });
  return next();
};

export default seller;
