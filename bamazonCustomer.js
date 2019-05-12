const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

db.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + db.threadId);
  db.end();
});