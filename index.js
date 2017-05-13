const express       = require('express');
const port          = process.env.PORT || 4000;
const app           = express();
const dest          = `${__dirname}/public`;
const bodyParser    = require('body-parser');
const env           = require('./config/env');
const router        = require('./config/routes');
// const errorHandler  = require('./lib/errors');
const mongoose      = require('mongoose');
mongoose.Promise    = require('bluebird');

app.use(express.static(dest));
// mongoose.connect(env.db[process.env.NODE_ENV]||env.db.development);

app.use(bodyParser.json());
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));
// app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));

module.exports = app;
