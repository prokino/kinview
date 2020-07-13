const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync, statSync } = require('fs')
const { join } = require("path")

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Server works!" });
});

app.get("/directories", (req,res) =>{
    let appname = req.query.app;
    let path = require('path').resolve(process.cwd(), 'public/' + appname);
    const dirs = readdirSync(path).filter(f => statSync(join(path, f)).isDirectory());
    res.json({ value: dirs });
    
})
// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
