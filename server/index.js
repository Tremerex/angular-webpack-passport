import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'clientSecret',
  name: 'session_id',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 60 * 1000
  }
}));

const port = process.env.PORT || 3000;

//************************************************************//
//********************** Passport Init ***********************//
//************************************************************//

app.use(passport.initialize());
app.use(passport.session());
const authFunction = passportConfig(passport);

//************************************************************//
//********************** WebApi Routes ***********************//
//************************************************************//

//Login example
app.post('/api/login', (req, res) => {
    passport.authenticate('login', data => {
      res.status(200).json({
        email: data.email,
        token: req.session.token 
      });
    })(req, res);
});

//test endPoint
app.get('/api/info', authFunction, (req, res) => {
    res.status(200).json({ message: 'User Authorized' });
});

//************************************************************//
//************************ Static path ***********************//
//************************************************************//

app.use(express.static(path.join(__dirname, '../public')));

//************************************************************//
//************************ MVC Routes ************************//
//************************************************************//

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//************************************************************//
//*********************** Server Port ************************//
//************************************************************//

app.listen(port, () => console.log('listing on port ' + port));
