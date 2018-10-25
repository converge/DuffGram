const express = require('express')
const app = express()
let port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/Users/converge/Documents/workspace/duffgram-engine/db/duffgram.db');
const bcrypt = require('bcrypt')

const saltRounds = 10

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/get_username_statistics', function(req, res) {
    db.all("SELECT id, ig_account_id, followers, followings, total_posts, created FROM ig_account_statistics", function(err, rows) {
	return res.json({ data: rows })
    });
});

app.get('/get_usernames', function(req, res) {
    db.all('SELECT id, username, created FROM ig_account', function(err, rows) {
	return res.json({ data: rows })
    })
})

app.post('/get_username', function(req, res) {
    try {
	db.get('SELECT id, username FROM ig_account WHERE id = ?', [req.body.account_id], function(err, row) {
	    return res.json({ data: row })
    })} catch (err) {
	return res.status(500).send('Something went wrong')
    }
})

app.get('/get_first_username', function(req, res) {
    db.get('SELECT id, username FROM ig_account ORDER BY id', function(err, row) {
	return res.json({ data: row })
    })
})

app.post('/create_ig_account', function(req, res) {
    const password = bcrypt.hashSync(req.body.password, saltRounds)
    try {
	const stmt = db.prepare('INSERT INTO ig_account (username, password, created) VALUES (?, ?, ?)')
	stmt.run(req.body.username, password, req.body.created)
	stmt.finalize()
	return res.status(200).send('ok')
    } catch (err) {
	return res.status(500).send('Something went wrong')
    }
})

app.post('/delete_ig_account', function(req, res) {
    try {
	const stmt = db.prepare('DELETE FROM ig_account WHERE id = ?')
	stmt.run(req.body.account_id)
	stmt.finalize()
	return res.status(200).send('ok')
    } catch (err) {
	return res.status(500).send('Something went wrong')
    }
})

app.post('/update_ig_account', function(req, res) {
    const password = bcrypt.hashSync(req.body.password, saltRounds)
    try {
	const stmt = db.prepare('UPDATE ig_account SET password=? WHERE id = ?')
	stmt.run(password, req.body.account_id)
	stmt.finalize()
	return res.status(200).send('ok')
    } catch (err) {
	return res.status(500).send('Something went wrong')
    }
})

app.listen(port);

app.use(function(req, res) {
    res.status(404).send({
	url: req.originalUrl + ' not found'
    })
});

console.log('RESTful API running on port: ' + port);
