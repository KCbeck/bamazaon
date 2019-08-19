var mysql = require('mysql');
var inquirer = require('inquirer');
//var Table = require('cli-table');
var productTable = 0;
var result = 0;



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon"
});

con.connect(function productTable(err) {
  if (err) throw err;
  //Select all customers and return the result object:
  con.query("SELECT id, product_name, price, stock_quantity FROM products", function (err, result, fields) {
   if (err) throw err;
    console.table(result);

      pickProduct(result);
     namePrice();
  });
});
  


  function namePrice() {

  }


function pickProduct(answer) {
  console.log(answer.length)
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "Enter the ID of the item you would like to purchase",
      validate: function(value) {
        if(isNaN(value) || answer.length < value)
          return false;

        return true;
      }
    },
    {
      name: "count",
      type: "input",
      message: "How many would you like to buy?"
    } ])

  
    .then(function(answer){
      console.log("");
      
     
      con.query("SELECT id, product_name, stock_quantity, price FROM products WHERE ?", { id: answer.item,}, function(err, results) {
        if (err) throw err;
      
    
      // Use user feedback for... whatever!!
      //console.log(answer.count);
      //console.log(results[0].stock_quantity);

       // updates the quantity after choice is made. 
       if (results[0].stock_quantity >= answer.count) {
        console.log("Congratulations","You chose to buy item number:  _", answer.item,"_  and you chose to buy  _", answer.count,);
       var newResult = results[0].stock_quantity - answer.count;
         var newResultPrice = parseFloat(results[0].price.substr(1)); 
       var newPrice = newResultPrice * answer.count;
      //  console.log(newResultPrice);
       console.log("Your total is: $"+ newPrice);
       console.log("There are a total of " + newResult +" remaining in stock");

      var sql = "UPDATE products SET stock_quantity = " + newResult + " WHERE id = " + answer.item;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated"); 
        console.log(answer.price);
        con.end();  
        

       
      });
    } else { 
    console.log("not enough in stock") 
    con.end();
  }
    });
     
    })
  }  
