// @flow
const express = require("express");
const app = express();
let port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");
const dateFormat = require("dateformat");

function start_server(userData)  {

  const path = require('path')
  const dbFile = path.resolve(userData, 'duffgram.db')
  const db = new Database(dbFile);

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  db.prepare("CREATE TABLE IF NOT EXISTS ig_account(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,username VARCHAR(150) NOT NULL,password VARCHAR(150) NOT NULL,proxy_host VARCHAR(100),proxy_port VARCHAR(6),created DATETIME,modified DATETIME)").run()
  db.prepare("CREATE TABLE IF NOT EXISTS ig_account_statistics (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,ig_account_id INTEGER NOT NULL,followers INTEGER,followings INTEGER,total_posts INTEGER,created DATETIME,modified DATETIME, CONSTRAINT fk_ig_account_statistics_ig_account1 FOREIGN KEY(ig_account_id)REFERENCES ig_account(id) ON DELETE CASCADE)").run()
  db.prepare("CREATE TABLE IF NOT EXISTS duff_account(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,ig_account_id INTEGER NOT NULL,email VARCHAR(150) NOT NULL,key VARCHAR(100),is_active INTEGER NOT NULL,created DATETIME,modified DATETIME,CONSTRAINT fk_duff_account_ig_account1 FOREIGN KEY(ig_account_id)REFERENCES ig_account(id)ON DELETE CASCADE)").run()

  app.get("/get_username_statistics", function(req, res) {
    try {
      const stmt = db.prepare(
        "SELECT id, ig_account_id, followers, followings, total_posts, created FROM ig_account_statistics WHERE ig_account_id = ?"
      );
      const rows = stmt.all(req.query.ig_account_id);
      return res.status(200).json({
        data: rows
      });
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.get("/get_usernames", function(req, res) {
    try {
      const stmt = db.prepare("SELECT id, username, created FROM ig_account");
      const rows = stmt.all();
      return res.status(200).json({
        data: rows
      });
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.get("/get_username", function(req, res) {
    try {
      const stmt = db.prepare("SELECT id, username FROM ig_account WHERE id = ?");
      const row = stmt.get(req.query.account_id);
      return res.status(200).json({
        data: row
      });
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.get("/get_username_by_username", function(req, res) {
    try {
      const stmt = db.prepare(
        "SELECT id, username, password FROM ig_account WHERE username = ?"
      );
      const row = stmt.get(req.query.username);
      return res.status(200).json({
        data: row
      });
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.get("/get_first_username", function(req, res) {
    try {
      const stmt = db.prepare("SELECT id, username FROM ig_account ORDER BY id")
      const row = stmt.get()
      return res.status(200).json({
        data: row
      })
    } catch (err) {
      return res.status(500).send('Something went wrong')
    }
  })

  app.post("/create_ig_account", function(req, res) {
    // not hashing passwords for now, need to find an alternative to load encrypt password to login into Instagram
    // const password = bcrypt.hashSync(req.body.password, saltRounds)
    try {
      const stmt = db.prepare(
        "INSERT INTO ig_account (username, password, created) VALUES (?, ?, ?)"
      );
      stmt.run(req.body.username, req.body.password, req.body.created);
      return res.status(200).send("ok");
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.post("/delete_ig_account", function(req, res) {
    console.log(req.body);
    try {
      const stmt = db.prepare("DELETE FROM ig_account WHERE id = ?");
      stmt.run(req.body.account_id);
      return res.status(200).send("ok");
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.post("/update_ig_account", function(req, res) {
    // const password = bcrypt.hashSync(req.body.password, saltRounds);
    try {
      const stmt = db.prepare("UPDATE ig_account SET password=? WHERE id = ?");
      stmt.run(req.body.password, req.body.account_id);
      return res.status(200).send("ok");
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.post("/add_username_statistics", function(req, res) {
    const created = dateFormat(new Date(), "yyyy-mm-dd");
    const modified = created;
    try {
      const stmt = db.prepare(
        "INSERT INTO ig_account_statistics (ig_account_id, followers, followings, total_posts, created, modified) VALUES (?, ?, ?, ?, ?, ?)"
      );
      stmt.run(
        req.body.ig_account_id,
        req.body.followers,
        req.body.followings,
        req.body.total_posts,
        created,
        modified
      );
      return res.status(200).send("ok");
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  });

  app.listen(port);

  app.use(function(req, res) {
    res.status(404).send({
      url: req.originalUrl + " not found"
    });
  });

  console.log("RESTful API running on port: " + port);
}

module.exports.start_server = start_server;
