/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';

const app = express();

require('./routes/index')(app);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {});

export default server;
