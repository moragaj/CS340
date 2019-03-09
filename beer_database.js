// Author: Jon Moraga, Andy Tran
// Date: 2/26/2019
// Description: 

var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4202);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//This is needed for CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/addbeer',function(req,res,next){
   var context = {};
   var entry = [];
   entry.push(req.query.name);
   entry.push(req.query.description);
   entry.push(req.query.type);
   entry.push(req.query.abv);
   entry.push(req.query.ibu);
   entry.push(req.query.price);
   entry.push(req.query.brewer_id);
   entry.push(req.query.avg_score);
   queryString = "INSERT INTO beer ";
   queryString += "(`name`, `description`, `type`, `abv`, `ibu`, `price`, `brewer_id`, `avg_score`) ";
   queryString += "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
   mysql.pool.query(queryString, entry, function(err, result){
     if(err){
       next(err);
       return;
     }
   });
});

app.get('/addbrewery',function(req,res,next){
   var context = {};
   var entry = [];
   entry.push(req.query.name);
   entry.push(req.query.phone);
   entry.push(req.query.street);
   entry.push(req.query.city);
   entry.push(req.query.state);
   entry.push(req.query.country);
   entry.push(req.query.zip);
   queryString = "INSERT INTO brewer ";
   queryString += "(`name`, `phone`, `street`, `city`, `state`, `country`, `zip`) ";
   queryString += "VALUES (?, ?, ?, ?, ?, ?, ?)";
   mysql.pool.query(queryString, entry, function(err, result){
     if(err){
       next(err);
       return;
     }
   });
});

app.get('/addcustomer',function(req,res,next){
   var context = {};
   var entry = [];
   entry.push(req.query.first_name);
   entry.push(req.query.last_name);   
   entry.push(req.query.phone);
   entry.push(req.query.email);
   entry.push(req.query.street);
   entry.push(req.query.city);
   entry.push(req.query.state);
   entry.push(req.query.country);
   entry.push(req.query.zip);
   queryString = "INSERT INTO customer ";
   queryString += "(`first_name`, `last_name`, `phone`, `email`, `street`, `city`, `state`, `country`, `zip`) ";
   queryString += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
   mysql.pool.query(queryString, entry, function(err, result){
     if(err){
       next(err);
       return;
     }
   });
});

app.get('/addreview',function(req,res,next){
   var context = {};
   var entry = [];
   entry.push(req.query.customer_id);
   entry.push(req.query.beer_id);
   entry.push(req.query.review);
   entry.push(req.query.score);
   queryString = "INSERT INTO beer_review ";
   queryString += "(`customer_id`, `beer_id`, `review`, `score`) ";
   queryString += "VALUES (?, ?, ?, ?)";
   mysql.pool.query(queryString, entry, function(err, result){
     if(err){
       next(err);
       return;
     }
   });
});

app.get('/addorder',function(req,res,next){
   var context = {};
   var entry = [];
   entry.push(req.query.customer_id);
   entry.push(req.query.date);
   queryString = "INSERT INTO customer_order ";
   queryString += "(`customer_id`, `date`) ";
   queryString += "VALUES (?, ?)";
   mysql.pool.query(queryString, entry, function(err, result){
     if(err){
       next(err);
       return;
     }
   });
});

app.get('/update_beer',function(req,res,next){
  var context = {};
  var entry = [];
  mysql.pool.query("SELECT * FROM beer WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      entry.push(req.query.name || curVals.name);
      entry.push(req.query.description || curVals.description);
      entry.push(req.query.type || curVals.type);
      entry.push(req.query.abv || curVals.abv);
      entry.push(req.query.ibu || curVals.ibu);
      entry.push(req.query.price || curVals.price);
      entry.push(req.query.brewer_id || curVals.brewer_id);
      entry.push(req.query.avg_score || curVals.avg_score);

      var queryString = "UPDATE ";
      queryString += 'beer';
      queryString += ' SET name = ?, description = ?, type = ?, abv = ?, ibu = ?, price = ?,';
      queryString += ' brewer_id = ?, avg_score = ?';
      queryString += ' WHERE id = ' + req.query.id;
//     console.log(entry);
//     console.log(queryString);

      mysql.pool.query(queryString, entry, function(err, result){
        if(err){
         next(err);
         return;
        }
      });
    }    
  });
});

app.get('/update_brewery',function(req,res,next){
  var context = {};
  var entry = [];
  mysql.pool.query("SELECT * FROM brewer WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      entry.push(req.query.name || curVals.name);
      entry.push(req.query.phone || curVals.phone);
      entry.push(req.query.street || curVals.street);
      entry.push(req.query.city || curVals.city);
      entry.push(req.query.state || curVals.state);
      entry.push(req.query.country || curVals.country);
      entry.push(req.query.zip || curVals.zip);

      var queryString = "UPDATE ";
      queryString += 'brewer';
      queryString += ' SET name = ?, phone = ?, street = ?, city = ?, state = ?, country = ?,';
      queryString += ' zip = ?';
      queryString += ' WHERE id = ' + req.query.id;
//     console.log(entry);
//     console.log(queryString);

      mysql.pool.query(queryString, entry, function(err, result){
        if(err){
         next(err);
         return;
        }
      });
    }    
  });
});

app.get('/update_customer',function(req,res,next){
  var context = {};
  var entry = [];
  mysql.pool.query("SELECT * FROM customer WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      entry.push(req.query.first_name || curVals.first_name);
      entry.push(req.query.last_name || curVals.last_name);
      entry.push(req.query.phone || curVals.phone);
      entry.push(req.query.email || curVals.email);
      entry.push(req.query.street || curVals.street);
      entry.push(req.query.city || curVals.city);
      entry.push(req.query.state || curVals.state);
      entry.push(req.query.country || curVals.country);
      entry.push(req.query.zip || curVals.zip);

      var queryString = "UPDATE ";
      queryString += 'customer';
      queryString += ' SET first_name = ?, last_name = ?, phone = ?, email = ?, street = ?, ';
      queryString += 'city = ?, state = ?, country = ?, zip = ?';
      queryString += ' WHERE id = ' + req.query.id;
//     console.log(entry);
//     console.log(queryString);

      mysql.pool.query(queryString, entry, function(err, result){
        if(err){
         next(err);
         return;
        }
      });
    }    
  });
});

app.get('/update_review',function(req,res,next){
  var context = {};
  var entry = [];
  mysql.pool.query("SELECT * FROM beer_review WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      entry.push(req.query.review || curVals.review);
      entry.push(req.query.score || curVals.score);

      var queryString = "UPDATE ";
      queryString += 'beer_review';
      queryString += ' SET review = ?, score = ?';
      queryString += ' WHERE id = ' + req.query.id;
//     console.log(entry);
//     console.log(queryString);

      mysql.pool.query(queryString, entry, function(err, result){
        if(err){
         next(err);
         return;
        }
      });
    }    
  });
});

app.get('/beer',function(req,res,next){
  var context = {};
  var id = req.query.id;
  var query = 'SELECT B.id, B.name, B.description, BR.name AS brName, B.type, B.abv, B.ibu,'
  query = query +'B.avg_score, B.price FROM beer B INNER JOIN brewer BR ON B.brewer_id = BR.id';
  if (id > 0){
    query += ' WHERE B.id = ' + id;
  }
  mysql.pool.query(query, function(err, rows, fields){
    if(err){
      console.log("error");
      next(err);
      return;
    }
  res.type('application/json');
  res.send(rows);
  });
});

app.get('/detail',function(req,res,next){
  var context = {};
  var id = req.query.id;
  var query = 'SELECT score, review FROM beer_review';
  query += ' WHERE beer_id = ' + "'" + id + "'";
  mysql.pool.query(query, function(err, rows, fields){
    if(err){
      console.log("error");
      next(err);
      return;
    }
  res.type('application/json');
  res.send(rows);
  });
});


app.get('/brewery',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM brewer', function(err, rows, fields){
    if(err){
  console.log("error");
      next(err);
      return;
    }
  res.type('application/json');
  res.send(rows);
  });
});

app.get('/customer',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM customer', function(err, rows, fields){
    if(err){
  console.log("error");
      next(err);
      return;
    }
  res.type('application/json');
  res.send(rows);
  });
});

app.get('/review',function(req,res,next){
  var context = {};
  var query = 'SELECT BR.id, B.name AS beer_name, B.type, BW.name, BR.review, BR.score FROM beer_review BR';
  query += ' INNER JOIN beer B ON BR.beer_id = B.id';
  query += ' INNER JOIN brewer BW ON BW.id = B.brewer_id';
  mysql.pool.query(query, function(err, rows, fields){
    if(err){
      console.log("error");
      next(err);
      return;
    }
  res.type('application/json');
  res.send(rows);
  });
});

app.get('/order',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM customer_order', function(err, rows, fields){
    if(err){
  console.log("error");
      next(err);
      return;
    }
  res.type('application/json');
  res.send(rows);
  });
});

app.get('/delete',function(req,res,next){
   id = req.query.id;
   table = req.query.table;
   queryString = 'DELETE FROM ';
   queryString += table;
   queryString += ' WHERE id = ' + "'" + id + "'";
   mysql.pool.query(queryString, function(err, result){
     if(err){
       next(err);
       return;
     }
   });
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
