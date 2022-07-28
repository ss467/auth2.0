const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
require('./auth');

const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());




app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

var username;

app.get('/protected', isLoggedIn, (req, res) => {
  username = req.user.displayName;
  res.send(`<h1 style="color:black;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;position:relative;top:40%;left:40%">Welcome ${username}</h1>
  <br><a style="position:absolute;top:60%;left:50%;text-decoration:none;background-color:blueviolet;padding:25px;color:white;box-shadow:2px 5px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:18px" href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.listen(5000, () => console.log('listening on port: 5000'));
