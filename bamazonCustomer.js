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
  ]).then(function (inquirerResponse) {
    updateProduct(inquirerResponse.productName, inquirerResponse.numberOfUnits);
  });
}


showProduct = () => {
  db.query('SELECT * FROM products', function (err, res) {
    console.log(res);
    questions();
  });
}

 updateProduct = (name, quantity) => {
   console.log('Updating Product\'s!')
   const query = db.query(
     `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE ?`,
     [
       {
         product_name: name
       }
     ],
     function (err, res) {
       if(db.query('SELECT product_name FROM products WHERE stock_quantity <= 0') === name) {
       console.log('No Way!');
       } else {
       console.log(res.affectedRows + ' product(s) updated!');
       }
     }
   );
   console.log(query.sql);
 }