//Author: Jon Moraga, Andy Tran
//Date: 2/24/2019
//Description: 
//var queryString = location.search;

//console.log(queryString)

var urlParams = new URLSearchParams(location.search);
var id = urlParams.get('id');
var title = document.getElementById('title').innerHTML;
var mainURL = "http://flip3.engr.oregonstate.edu:4202/";

console.log(id);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;

console.log(today);

function buildBeers(){
  var select = document.getElementById('beer_id');
  var req = new XMLHttpRequest(); 
  var url = mainURL + 'beer';
  console.log(url);
  req.open('GET', url, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);//may not need to do this step
      console.log(response);
      for(var i = 0; i < response.length; i++){
        console.log(response[i]["id"]);
        var opt = document.createElement('option');
        opt.value = response[i]["id"];
        opt.innerHTML = response[i]["name"];
        select.appendChild(opt);
      }
    }
    else{
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(null);
}

function buildCustomers(){
  var select = document.getElementById('customer_id');
  var req = new XMLHttpRequest(); 
  var url = mainURL + 'customer';
  console.log(url);
  req.open('GET', url, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);//may not need to do this step
      console.log(response);
      for(var i = 0; i < response.length; i++){
        console.log(response[i]["id"]);
        var opt = document.createElement('option');
        opt.value = response[i]["id"];
        opt.innerHTML = response[i]["id"];
        select.appendChild(opt);
      }
    }
    else{
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(null);
}

function buildBreweries(){
  var select = document.getElementById('brewer_id');
  var req = new XMLHttpRequest(); 
  var url = mainURL + 'brewery';
  console.log(url);
  req.open('GET', url, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);//may not need to do this step
      console.log(response);
      for(var i = 0; i < response.length; i++){
        console.log(response[i]["id"]);
        var opt = document.createElement('option');
        opt.value = response[i]["id"];
        opt.innerHTML = response[i]["name"];
        select.appendChild(opt);
      }
    }
    else{
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(null);
}

function buildReviews(){
  var select = document.getElementById('id');
  var req = new XMLHttpRequest(); 
  var url = mainURL + 'review';
  console.log(url);
  req.open('GET', url, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);//may not need to do this step
      console.log(response);
      for(var i = 0; i < response.length; i++){
        console.log(response[i]["id"]);
        var opt = document.createElement('option');
        opt.value = response[i]["id"];
        opt.innerHTML = response[i]["id"];
        select.appendChild(opt);
      }
    }
    else{
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(null);
}

if(title=='beer' || title=='brewery' || title=='customer' || title=='review' || title=="order"){
  function buildTable(){
  var table = document.getElementsByTagName('tbody')[0];
  var req = new XMLHttpRequest(); 
  var url = mainURL + title;
  console.log(url);
  req.open('GET', url, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);//may not need to do this step
      console.log(response);
      for(var i = 0; i < response.length; i++){
       var newRow = table.insertRow(table.rows.length);
       newRow.id = "row" + response[i]["id"];
       var index = 0;
       for(var key in response[i]){
        if(index > -1){//change this to 0 and next line to index-1 to remove ID
          console.log(key);
          var newCell = newRow.insertCell(index);
          var newText = document.createTextNode(response[i][key]);
          if(title=='beer' && index==1){
            var link = document.createElement("a");
            var url = "Beer Detail.html?id=" + response[i]["id"];
            link.setAttribute("href", url);
            link.appendChild(newText);
            newCell.appendChild(link);
          }
          else{
            newCell.appendChild(newText); 
          }
        }
        index++;
       }
      }
    } 
    else{
      console.log("Error in network request: " + req.statusText);
    }});
   req.send(null);
  }
  buildTable();
}

var div = document.getElementById('detail');

if(title=='detail'){
  function buildTable(){
 // var table = document.getElementsByTagName('tbody')[0];
    var div = document.getElementById('detail');
    var req = new XMLHttpRequest(); 
    var url = mainURL + 'beer' + '?id=' + id;
    console.log(url);
    req.open('GET', url, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);//may not need to do this step
        console.log(response);
        document.getElementById("id").innerHTML = response[0]["id"];
        document.getElementById("name").innerHTML = response[0]["name"];
        document.getElementById("description").innerHTML = response[0]["description"];
        document.getElementById("type").innerHTML = response[0]["type"];
        document.getElementById("abv").innerHTML = response[0]["abv"];
        document.getElementById("ibu").innerHTML = response[0]["ibu"];
        document.getElementById("brewery").innerHTML = response[0]["brName"];
        document.getElementById("rating").innerHTML = response[0]["avg_score"];
        document.getElementById("price").innerHTML = response[0]["price"];
      }

      else{
        console.log("Error in network request: " + req.statusText);
      }});
     req.send(null);
  }
  buildTable();
}

if(title=='detail'){
  function buildTable(){
  var table = document.getElementsByTagName('tbody')[0];
  var req = new XMLHttpRequest(); 
  var url = mainURL + title + '?id=' + id;
  console.log(url);
  req.open('GET', url, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);//may not need to do this step
      console.log(response);
      for(var i = 0; i < response.length; i++){
       var newRow = table.insertRow(table.rows.length);
       newRow.id = "row" + response[i]["id"];
       var index = 0;
        for(var key in response[i]){
          if(index > -1){//change this to 0 and next line to index-1 to remove ID
            console.log(response);
            var newCell = newRow.insertCell(index-1);
            var newText = document.createTextNode(response[i][key]);
            newCell.appendChild(newText);
          }
        index++;
       }
      }
    } 
    else{
      console.log("Error in network request: " + req.statusText);
    }});
   req.send(null);
  }
  buildTable();
}

if(title =='add_beer'){
  document.getElementById('add_beer').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var name = document.getElementById("name").value;
      var type = document.getElementById("type").value;
      var abv = document.getElementById("abv").value;
      var ibu = document.getElementById("ibu").value;
      var brewer_id = document.getElementById("brewer_id").value;
      var price = document.getElementById("price").value;
      var description = document.getElementById("description").value;    

      query =  query +'name=' + name;
      query = query + '&' + 'type=' + type;
      query = query + '&' + 'abv=' + abv;
      query = query + '&' + 'ibu=' + ibu;
      query = query + '&' + 'brewer_id=' + brewer_id;
      query = query + '&' + 'price=' + price;
      query = query + '&' + 'description=' + description;
      console.log(query);

      var url = mainURL + 'addbeer' + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });
  
}

if(title =='add_brewery'){
  document.getElementById('add').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var name = document.getElementById("name").value;
      var phone = document.getElementById("phone").value;
      var street = document.getElementById("street").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var country = document.getElementById("country").value;
      var zip = document.getElementById("zip").value;    

      query =  query +'name=' + name;
      query = query + '&' + 'phone=' + phone;
      query = query + '&' + 'street=' + street;
      query = query + '&' + 'city=' + city;
      query = query + '&' + 'state=' + state;
      query = query + '&' + 'country=' + country;
      query = query + '&' + 'zip=' + zip;
      console.log(query);

      url = mainURL + 'addbrewery' + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });
}

if(title =='add_customer'){
  document.getElementById('add').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var first_name = document.getElementById("first_name").value;
      var last_name = document.getElementById("last_name").value;
      var phone = document.getElementById("phone").value;
      var email = document.getElementById("email").value;
      var street = document.getElementById("street").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var country = document.getElementById("country").value;
      var zip = document.getElementById("zip").value;    

      query =  query + '&' + 'first_name=' + first_name;
      query =  query + '&' + 'last_name=' + last_name;      
      query = query + '&' + 'phone=' + phone;
      query = query + '&' + 'email=' + email;      
      query = query + '&' + 'street=' + street;
      query = query + '&' + 'city=' + city;
      query = query + '&' + 'state=' + state;
      query = query + '&' + 'country=' + country;
      query = query + '&' + 'zip=' + zip;
      console.log(query);

      url = mainURL + 'addcustomer' + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });
}

if(title =='add_review'){
  document.getElementById('add').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var customer_id = document.getElementById("customer_id").value;
      var beer_id = document.getElementById("beer_id").value;
      var review = document.getElementById("review").value;
      var score = document.getElementById("score").value;  

      query =  query + '&' + 'customer_id=' + customer_id;
      query =  query + '&' + 'beer_id=' + beer_id;      
      query = query + '&' + 'review=' + review;
      query = query + '&' + 'score=' + score;      
      console.log(query);

      url = mainURL + 'addreview' + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });

  buildCustomers();
  buildBeers();
}

if(title =='add_order'){
  document.getElementById('add').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var customer_id = document.getElementById("customer_id").value; 

      query += 'customer_id=' + customer_id;
      query += '&' + 'date=' + today;          
      console.log(query);

      url = mainURL + 'addorder' + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });

  buildCustomers();
}

if(title =='update_beer'){
  document.getElementById('update').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var id = document.getElementById("beer_id").value;
      var name = document.getElementById("name").value;
      var type = document.getElementById("type").value;
      var abv = document.getElementById("abv").value;
      var ibu = document.getElementById("ibu").value;
      var brewer_id = document.getElementById("brewer_id").value;
      var price = document.getElementById("price").value;
      var description = document.getElementById("description").value;    

      query += 'name=' + name;
      query += '&' + 'id=' + id;
      query += '&' + 'type=' + type;
      query += '&' + 'abv=' + abv;
      query += '&' + 'ibu=' + ibu;
      query += '&' + 'brewer_id=' + brewer_id;
      query += '&' + 'price=' + price;
      query += '&' + 'description=' + description;
      console.log(query);

      var url = mainURL + title + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });

  buildBeers();
  buildBreweries();

}

if(title =='update_brewery'){
  document.getElementById('update').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var id = document.getElementById("brewer_id").value;
      var name = document.getElementById("name").value;
      var phone = document.getElementById("phone").value;
      var street = document.getElementById("street").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var country = document.getElementById("country").value;
      var zip = document.getElementById("zip").value;    

      query += 'name=' + name;
      query += '&' + 'id=' + id;
      query += '&' + 'phone=' + phone;
      query += '&' + 'street=' + street;
      query += '&' + 'city=' + city;
      query += '&' + 'state=' + state;
      query += '&' + 'country=' + country;
      query += '&' + 'zip=' + zip;

      console.log(query);

      var url = mainURL + title + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });

  buildBreweries();
}

if(title =='update_customer'){
  document.getElementById('update').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var id = document.getElementById("customer_id").value;
      var first_name = document.getElementById("first_name").value;
      var last_name = document.getElementById("last_name").value;
      var phone = document.getElementById("phone").value;
      var email = document.getElementById("email").value;
      var street = document.getElementById("street").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var country = document.getElementById("country").value;
      var zip = document.getElementById("zip").value;

      query += 'id=' + id;
      query += '&' + 'first_name=' + first_name;
      query += '&' + 'last_name=' + last_name;      
      query += '&' + 'phone=' + phone;
      query += '&' + 'email=' + email;      
      query += '&' + 'street=' + street;
      query += '&' + 'city=' + city;
      query += '&' + 'state=' + state;
      query += '&' + 'country=' + country;
      query += '&' + 'zip=' + zip;

      console.log(query);

      var url = mainURL + title + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });

  buildCustomers();
}

if(title =='update_review'){
  document.getElementById('update').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var id = document.getElementById("id").value;
      var review = document.getElementById("review").value;
      var score = document.getElementById("score").value;  

      query += 'id=' + id;     
      query +='&' + 'review=' + review;
      query += '&' + 'score=' + score;      
      console.log(query);

      url = mainURL + title + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });

  buildReviews();
}

if(title =='delete'){
  document.getElementById('delete').addEventListener('click', function(event){
    event.preventDefault();
      var req = new XMLHttpRequest();
      var query = '?';
      var table = document.getElementById("table").value;
      var id = document.getElementById("id").value;

      query += 'table=' + table;
      query += '&' + 'id=' + id;       
      console.log(query);

      url = mainURL + title + query;

      req.open('GET', url, true);
      req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
    
      } 
      else{
            console.log("Error in network request: " + req.statusText);
      }
    });
      req.send(null);
  });
}