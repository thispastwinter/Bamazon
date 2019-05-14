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
  showProducts();
})

showProducts = () => {
  db.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    res.forEach(function (x) {
      console.log(x.id, x.product_name, x.price);
    })
    questions();
  });
}

questions = () => {
  inquirer.prompt([{
      name: 'productName',
      message: 'What is the ID of the product you\'d like to buy?',
    },
    {
      name: 'numberOfUnits',
      message: 'How many units would you like to purchase?',
    }
  ]).then(function (inquirerResponse) {
    checkQuantities(parseInt(inquirerResponse.productName), inquirerResponse.numberOfUnits);
  });
}

checkQuantities = (number, quantity) => {
  console.log('Checking Quantities!')
  db.query(`SELECT id FROM products WHERE stock_quantity <= 0 AND id = ${number}`, function (err, res) {
    if (err) throw err;
    if (res[0].id === number) {
      console.log(id, res[0].id)
      console.log('We apologize, but that item is no longer available.')
      db.end();
    } else {
      updateProduct(number, quantity);
    }
  });
}

updateProduct = (number, quantity) => {
  console.log('Updating Products!')
  db.query(
    `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE ?`,
    [{
      id: number
    }],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product(s) updated!');
      db.end();
    });
}