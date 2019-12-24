# EJS layouts 

Scenario:
EJS does not support blocks; ergo, there no concept of overriding / prepend / append to block.
The usual convention is to use `include()` to inject commonly used components into each page, There usually is no concept of 'base' template.

Aim:
1). To simulate blocks in EJS using conventional methods of the templating engine and javascript
2). To avoid includes of commonly used components inside multiple pages, but instead to put those components in base template.
    eg: top navigation components needs to be included inside every single page of ejs

Solution:
* EJS `include()` method takes two arguments file name and an object, <%- include('base', {content: blog}); %>
* It is possible to create javascript variables inside EJS. eg: <% let blog = `<div> blurb </div>` %>

using the above two features, it is possible to imagine javascript variables as `blocks` that a child/base template can use as is or replace with a new value.

# Example

node/express:
app.get('/admins', (req, res, next) => {
  return res.render('admins', {
    title: 'admins',
    path: '/admins',
    admin: 'Eddie Hall'
  });
});

admins.ejs
<% let styles = `
    <link rel="stylesheet" href="/css/style.css" />
    ` 
%>

<% let content = `
<div class="content"> 
    <h1>Admin: <small>${admin}</small></h1>
</div>
` %>

<%- include('base.ejs', {
    styles: styles, 
    content: content
}) %>

base.ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <%- styles %>
  </head>
  <body>
    <div class="topnav">
      <a class="<%= path === '/users'? 'active' : '' %>" href="/users">Users</a>
      <a class="<%= path === '/admins'? 'active' : '' %>" href="/admins">Admin</a>
    </div>
    <%- content %>
  </body>
</html>

* visit users.ejs for more conditional and looping structures
* visit base.ejs for overriding and appending / prepending to content variable

Explanation of example:
* app.js 
    passes three values title, path, admin. 
    title and path are meant to be used in base.ejs and admin is used in admins.ejs.
* admins.ejs
    declares two variables styles and content
    the two variables contain style tag and div tag respectively, they need to be enclosed in string literals
    finally there is an includes call passing the two variables to base.ejs
* base.ejs
    styles and content variables are passed to base.ejs from admins.ejs
    base.ejs outputs the variables as html

Capabalities:
* the variables passed into the child/base can be manipulated with override / append / prepend.
* default variables declard in parent can be passed to child templates
* there is now a base template that holds common components eliminating multiple include statements.
* Simulates `Blocks` in EJS using standard conventions
* using looping structures to output array / objects
* using conditional structures to output data

Caveat: 
* since variable data must be enclosed inside string literals use of looping structures is limited (views need to hold minimal logic anyway)
* we are limited to using Array.prototype.map(), ternary operators, Object.keys(obj), Object.values(obj)
* we have to use partials if the looping structure is more demanding.
* it might be an eyesore to put structures inside string literals.