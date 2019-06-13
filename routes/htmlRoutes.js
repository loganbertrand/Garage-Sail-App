var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.GarageSale.findAll({}).then(function(dbGarageSales) {
      res.render("index", {
        garageSales: dbGarageSales
      });
    });
  });

  //Load Page to Post Garage Sale
  app.get("/post", function(req, res) {
      res.render("post");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.GarageSale.findOne({ where: { id: req.params.id } }).then(function(dbGarageSale) {
      res.render("example", {
        garageSales: dbGarageSale
      });
    });
  });

  app.get("/post", function(req, res) {
    res.render("post");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
