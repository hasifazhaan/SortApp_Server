const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "first",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/insert", (req, res) => {
  const SortName = req.body.SortName;
  const Speed = req.body.Speed;
  const len = req.body.len;
  const data =
    "insert into SortTable (Sort_Name ,ArrayLength ,Speed) values (?,?,?)";
  database.query(data, [SortName, len, Speed], (error, result) => {
    console.log("name", SortName);
    // console.log("Sp",Speed)
    if (error) {
      console.log("ERROR:");
      console.error(error);
    }
  });
});
app.get("/getAvg", (req, res) => {
  let param = req.query.sortname;
  const data = `SELECT AVG(SPEED) as average ,ArrayLength from SortTable WHERE Sort_Name = '${param}'GROUP BY(ArrayLength) `;
  database.query(data, (request, response) => {
    res.send(response);
  });
});
app.get("/getTop", (req, res) => {
  let param = req.query.sortname;
  const data = `SELECT MAX(SPEED)as max ,ArrayLength from SortTable WHERE Sort_Name = '${param}'GROUP BY(ArrayLength) `;
  database.query(data, (request, response) => {
    res.send(response);
  });
});
app.get("/getLeast", (req, res) => {
  let param = req.query.sortname;
  const data = `SELECT MIN(SPEED) as min ,ArrayLength from SortTable WHERE Sort_Name = '${param}'GROUP BY(ArrayLength) `;
  database.query(data, (request, response) => {
    res.send(response);
  });
});
app.get('/',(req,res)=>{
    res.end("Server Is Running")

})
app.listen(3001, (req,res) => {
  console.log("Server Running ...");
  
});
