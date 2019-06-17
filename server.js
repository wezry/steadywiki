var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PAGES = "pages";

var app = express();
app.use(bodyParser.json());

// serve our angular app
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// Error handling
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

/**
 * api/pages
 * GET: get all pages
 */

app.get("/api/pages", function(req, res) {
    db.collection(PAGES).find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get pages.");
        } else {
          res.status(200).json({pages: docs});
        }
      });
});

/**
 * api/pages/:id
 * GET: get page by id
 */

app.get("/api/pages/:id", function(req, res) {
    db.collection(PAGES).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get contact");
        } else {
          res.status(200).json(doc);
        }
      });
});