const mysql = require('mysql');
const inquirer = require('inquirer')

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

showProduct = (name) => {
  db.query('SELECT' + name + 'FROM products', function (err, res) {
    if (name === 'graphics card') {
      console.log('Awesome!');
    }
    db.end();
  });
}

inquirer.prompt([
  {
    name: 'productName',
    message: 'What is the name of the product you\'d like to buy?',
  },
  {
    name: 'numberOfUnits',
    message: 'How many units would you like to purchase?',
  }
]).then(function(inquirerResponse) {
  showProduct(inquirerResponse.productName.toLowerCase());
});

