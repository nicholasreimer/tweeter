//JS CODE - SERVER ROUTES:
//---------------------------------------------------------------------------------------------------------------------
//SERVER SETUP:

// -a literal expression placed globally that indicates to the browser that the code should be executed in strict mode
"use strict";

const userHelper = require("../lib/util/user-helper");
const express = require("express");
const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {
//-------------------------------------------------------------------------------------------------------------------
// ROUTE REQUESTS: //
//------------------

  // GET: displays the tweets to the client
  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  //----------------------------------------------------------------------------------------------------------------------
  // POST: receives a submitted tweet from a client,
  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }

    // -creates a tweet object containging: the client input (tweet), current date/time and a value for user.
    // -the value for user can be based on a client submission OR it can be randomnly generated (via the generateRandomUser())
    const user = req.body.user
      ? req.body.user
      : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text,
      },
      created_at: Date.now(),
    };

    // -once the tweet object has been created it gets passed to the saveTweet() where it is then saved to the db object (objs within a db object)
    // the DataHelpers module creates an interface to the database (see index file for more details)
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;
};

//-------------------------------------------------------------------------------------------
// POST: receives a submitted tweet from a client from the form in the index.html file
tweetsRoutes.post("/tweets", function (req, res) {
  if (!req.body.text) {
    res.status(400).json({ error: "invalid request: no data in POST body" });
    return;
  }