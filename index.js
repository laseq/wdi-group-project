const express       = require('express');
const morgan        = require('morgan');
const cors          = require('cors');
const port          = process.env.PORT || 4000;
const app           = express();
const dest          = `${__dirname}/public`;
const bodyParser    = require('body-parser');
const env           = require('./config/env');
const router        = require('./config/routes');
const errorHandler  = require('./lib/errorHandler');
const mongoose      = require('mongoose');
mongoose.Promise    = require('bluebird');
const expressJWT    = require('express-jwt');

app.use(express.static(dest));
mongoose.connect(env.db[process.env.NODE_ENV]);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', expressJWT({ secret: env.secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'Unauthorized request.' });
}

app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));
app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));

module.exports = app;
