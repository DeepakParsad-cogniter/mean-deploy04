// const { application } = require('express');
var express = require('express');
var app = express();
// var mysql = require('mysql');
const cros = require('cors');
const path = require("path");
const nodemailer = require('nodemailer');
const Profile = require('./profile');
const headers = new express.Router()

headers.use((req, res, next) => {
   
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH,PUT, DELETE, OPTIONS"
    ); next();
});
// var con = mysql.createConnection({
// 	host: "",
// 	user: "BIGmediaprinting",
// 	password: "8fUjbSY(U*DowBu6Az",
// 	database: "bigmediaprinting"
// });
/* User List API */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "mongodb+srv://dparsad:%40password123@cluster0.mqasazh.mongodb.net/?retryWrites=true&w=majority"
    // Connect MongoDB at default port 27017.
let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

app.use(cros({origin: '*'}));
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/tutorialteacher/dist'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/tutorialteacher/dist/index.html'));
});
/** Delete User */
app.get('/edituser/:id', function (req, res) {
	con.query("SELECT * FROM customers where id = '"+req.params.id+"'", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
})
app.get('api/pagination', function (req, res) {
	console.log("hi");
	res.send({
		message: "Profile fetched successfully!",
		profile: "prof"
	});
	Profile.find().then(prof => {
		if (prof) {
			
			res.status(200).json({
				message: "Profile fetched successfully!",
				profile: prof
			});
		} else {
			res.status(404).json({ message: "Profile not found!" });
		}
	})
	.catch(e=>{
		console.log(e)
	});
	console.log("hi");
	var page = req.params.id;
	var offset = (page * 2) - 2;
	if(page == 1){
		var offset = 0;
	}
	// con.query("SELECT * FROM customers order by id desc", function (err, result, fields) {
	// 	if (err) throw err;
	// 	res.send(result);
	// });
})
app.delete('/deleteuser/:id', function (req, res) {
	con.query("Delete FROM customers where id = '"+req.params.id+"'", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
		console.log("1 record Deleted");
	});
})
/** User list */
// app.get('/', function (req, res) {
// 	con.query("SELECT * FROM customers", function (err, result, fields) {
// 		if (err) throw err;
// 		res.send(result);
// 	});
// })
/* add User */
app.post('/adduser',function(req,res){
	Profile.find().then(prof => {
		if (prof) {
		  
			res.status(200).json({
				message: "Profile fetched successfully!",
				profile: prof
			});
		} else {
			res.status(404).json({ message: "Profile not found!" });
		}
	})
	.catch(e=>{
		console.log(e)
	});
	debugger;
	var name = req.body.name;
	var email = req.body.email;
	var contact = req.body.contact;
	var id = req.body.id;
	// if(id == ""){
	// 	var sql = "INSERT INTO customers (name,email,contact) VALUES ('"+name+"','"+email+"','"+contact+"')";
	// 	}else{
	// 	var sql = "UPDATE `customers` SET `email` = '"+email+"', `name` = '"+name+"', `contact` = '"+contact+"'  WHERE `id` = '"+id+"'";
	// }
	// console.log(sql)
	// con.query(sql, function (err, result) {
	// 	if (err) throw err;
	// 	console.log("1 record inserted");
	// });
});
/* Create Server */
// var server = app.listen(8081, function () {
// 	var host = server.address().address
// 	var port = server.address().port
// 	console.log("Example app listening at http://%s:%s", host, port)
// })

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log("Listening on " + port);
});