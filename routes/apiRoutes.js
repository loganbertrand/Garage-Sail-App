var db = require('../models');

module.exports = function(app) {
  // Get all examples
  app.get('/api/garagesale', function(req, res) {
    db.GarageSale.findAll({}).then(function(dbGarageSales) {
      res.json(dbGarageSales);
    });
  });

  // Create a new GarageSale
  app.post('/api/garagesale', function(req, res) {
    console.log(req.body);
    db.GarageSale.create(req.body).then(function(dbGarageSale) {
      res.json(dbGarageSale);
    });
  });

  // Delete an GarageSale by id
  app.delete('/api/garagesale/:id', function(req, res) {
    db.GarageSale.destroy({ where: { id: req.params.id } }).then(function(
      dbGarageSale
    ) {
      res.json(dbGarageSale);
    });
  });

  //Update a Garage Sale
  app.put('/api/garagesale/:id', function(req, res) {
    db.GarageSale.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbGarageSale) {
      res.json(dbGarageSale);
    });
  });
};
