const mysql = require('mysql');
const inquirer = require('inquirer')

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon",
});

db.connect(function (err) {
  if (err) throw err;
  showProduct();
})

questions = () => {
  inquirer.prompt([{
      name: 'productName',
      message: 'What is the name of the product you\'d like to buy?',
    },
    {
      name: 'numberOfUnits',
      message: 'How many units would you like to purchase?',
    }
  ]).then(function () {
    updateProduct();
  });
}


showProduct = () => {
  db.query('SELECT * FROM products', function (err, res) {
    console.log(res);
    questions();
  });
}

 updateProduct = () => {
   console.log('You found me!')
 }