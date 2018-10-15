var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/Users/converge/Documents/workspace/duffgram-engine/db/duffgram.db');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/get_username_statistics', function(req, res) {
    db.all("SELECT id, ig_account_id, followers, followings, total_posts, created FROM ig_account_statistics", function(err, rows) {
        res.json({ data: rows })
    });
});

app.get('/get_usernames', function(req, res) {
    db.all('SELECT id, username, created FROM ig_account', function(err, rows) {
        res.json({ data: rows})
    })
})

app.listen(port);

app.use(function(req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
});

console.log('RESTful API running on port: ' + port);
