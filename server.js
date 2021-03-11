// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express')
const bodyParser = require('body-parser');
// Start up an instance of app
app=express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200, // For legacy browser support
//     methods: "GET, PUT ,POST"
// }

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
/*
 */

app.get('/all',(req,res)=>{  //get from server
  res.send(projectData);
  })                              
app.post('/add',(req,res)=>{ //send to server
    projectData ["date"]=req.body.date
    projectData ["feelings"]=req.body.feelings
    projectData ["temp"]=req.body.temp
    res.send(projectData)
                               })
// Setup Server
const server = app.listen(3000, listening)

const PORT = 3000
function listening() {
  console.log(`running on localhost: ${PORT}`);
};