/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import jsonwebtoken from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const authenication = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ message: 'Access Denied: No token provided' });

  try {
    const decoded = jsonwebtoken.verify(token, 'supertopsecret');
    req.user = decoded;
    req.id = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).send({ error });
  }
};

export default authenication;
