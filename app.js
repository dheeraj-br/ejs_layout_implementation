const express = require('express');
const app = express();
const path = require('path');

app.listen(process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res, next) => {
  return res.render('users', {
    title: 'Users',
    path: '/users',
    users: ['Brian shaw', 'Thor', 'Benny', 'Big Z']
  });
});

app.get('/admins', (req, res, next) => {
  return res.render('admins', {
    title: 'admins',
    path: '/admins',
    admin: 'Eddie Hall'
  });
});