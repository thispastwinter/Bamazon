// Required Modules

const mysql = require('mysql');
const inquirer = require('inquirer')

// Database Connection

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "enjoii189",
  database: "bamazon",
});

// Once connected to database, initial functin is triggered

db.connect(function (err) {
  if (err) throw err;
  showProducts();
})

// Displays all products in database, then triggers inquirer prompts via questions()

showProducts = () => {
  db.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    res.forEach(function (x) {
      console.log(x.id, x.product_name, x.price);
    })
    questions();
  });
}

// This function is passed to inquirer to ensure user only enters numbers as values
// Found this solution online

function validateNumber(number) {
  const reg = /^\d+$/;
  return reg.test(number) || "Must be a number!";
}

// Initial Inquirer questions

questions = () => {
  inquirer.prompt([{
      type: 'input',
      name: 'productName',
      message: 'What is the ID of the product you\'d like to buy?',
      validate: validateNumber
    },
    {
      type: 'input',
      name: 'numberOfUnits',
      message: 'How many units would you like to purchase?',
      validate: validateNumber
    }
  ]).then(function (inquirerResponse) {
    checkInventory(parseInt(inquirerResponse.productName), parseInt(inquirerResponse.numberOfUnits));
  });
}

// Secondary Inquirer questions

additionalQuestions = (number, quantity) => {
  inquirer.prompt([{
      type: 'list',
      name: 'orderAnyway',
      message: 'Would you still like to place an order?',
      choices: ['Yes', 'No']
    },
    {
      type: 'input',
      name: 'numberOfUnits',
      message: `How many units would you like to purchase? There are ${quantity} units left.`,
      validate: validateNumber
    }
  ]).then(function (inquirerResponse) {
    if (inquirerResponse.orderAnyway === 'Yes') {
      console.log(('-').repeat(30));
      updateProduct(number, parseInt(inquirerResponse.numberOfUnits));
    } else {
      continueShopping();
    }
  })
}

// Continue shopping?

continueShopping = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'continueShopping',
    message: 'Continue Shopping?',
    choices: ['Yes', 'No']
  }]).then(function (inquirerResponse) {
    if (inquirerResponse.continueShopping === 'Yes') {
      console.log(('-').repeat(30));
      showProducts();
    } else {
      db.end();
    }
  })
}

// Checks inventory against users input and acts accordingly

checkInventory = (number, quantity) => {
  console.log('Checking Inventory!')
  console.log(('-').repeat(30));
  db.query(`SELECT stock_quantity FROM products WHERE id=${number}`,
    function (err, res) {
      if (err) throw err;
      if (quantity > res[0].stock_quantity && res[0].stock_quantity > 0) {
        console.log(`We're sorry but there are only ${res[0].stock_quantity} items left!`);
        console.log(('-').repeat(30));
        additionalQuestions(number, res[0].stock_quantity);
      } else if (res[0].stock_quantity === 0) {
        console.log('We\'re sorry, but that item is completely out of stock!');
        console.log(('-').repeat(30));
        continueShopping()
      } else {
        updateProduct(number, quantity);
      }
    });
}

// Updates products if they pass the conditionals of checkInventory()

updateProduct = (number, quantity) => {
  console.log('Congratulation, your purchase was successful!')
  db.query(`UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE stock_quantity > 0 AND id=${number}`,
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product(s) updated!');
      console.log(('-').repeat(30));
      continueShopping();
    });
}