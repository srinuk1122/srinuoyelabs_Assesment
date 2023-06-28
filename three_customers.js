const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");



const customers = [
  {
    email: "anurag11@yopmail.com",
    name: "anurag"
  },
  {
    email: "sameer11@yopmail.com",
    name: "sameer"
  },
  {
    email: "ravi11@yopmail.com",
    name: "ravi"
  },
  {
    email: "akash11@yopmail.com",
    name: "akash"
  },
  {
    email: "anjali11@yopmail.com",
    name: "anjai"
  },
  {
    email: "santosh11@yopmail.com",
    name: "santosh"
  }
];

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'oyeLabs_db' // database name
});

db.connect((error) => {
  if (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  } else {
    console.log('Connected to the database.');
    createTable();
    insertCustomers();
  }
});

function createTable() {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS customers (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE
  )`;

  db.query(createTableQuery, (error) => {
    if (error) {
      console.error(`Error creating table: ${error.message}`);
    } else {
      console.log('Table created successfully.');
    }
  });
}

function insertCustomers() {
  customers.forEach(customer => {
    const { email, name } = customer;
    const query = `INSERT INTO customers (name, email) VALUES ('${name}', '${email}') ON DUPLICATE KEY UPDATE name = '${name}'`;

    db.query(query, (error, results) => {
      if (error) {
        console.error(`Error inserting customer ${name}: ${error.message}`);
      } else {
        console.log(`Customer ${name} inserted successfully.`);
      }
    });
  });
}


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



app.post('/customers', (req, res) => {
  const { email, name } = req.body;
  const query = `INSERT INTO customers (name, email) VALUES ('${name}', '${email}') ON DUPLICATE KEY UPDATE name = '${name}'`;

  db.query(query, (error, results) => {
    if (error) {
      console.error(`Error inserting customer ${name}: ${error.message}`);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log(`Customer ${name} inserted successfully.`);
      res.status(200).json({ success: true });
    }
  });
});


app.listen(5000,() => {
    console.log("server is running on port 5000");
})