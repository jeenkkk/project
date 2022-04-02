/* Import modules here: express, dotenv, router */
/* Config dotenv and router */
/* Connection to MySQL */
const mysql = require('mysql2');
const express = require('express');
const dotenv = require('dotenv')
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./db.js');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

/************************************************************ CRUD **********************************************************/
dotenv.config({ path: path.join(__dirname, './.env') })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));
app.set('SEC3', 'ejs');

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PORT
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connected DB: " + process.env.MYSQL_DATABASE);
});

app.listen(3030, () => { console.log("Express server is running at port no: 3030") });
/************************************************************ USER **********************************************************/
// Testing Select all users
// method: GET
// URL: http://localhost:3000/User_info

app.get('/User_info', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM User_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
// Testing Select a user by username
// Case:1
// method: GET
// URL: http://localhost:3000/User_info/Username/jeen
// Case:2
// method: GET
// URL: http://localhost:3000/User_info/Username/Ironman
app.get('/User_info/Username/:Username', (req, res) => { //SELECT
    let username = req.params.Username;
    if (!username) {
        return res.status(400).send({ error: true, message: 'Please provide username.' });
    }
    connection.query('SELECT * FROM User_info WHERE Username = ?', username, (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
// Testing Select a user by email
// Case:1

// URL: http://localhost:3000/User_info/email/dog@gmail.com
// Case:2
// method: GET
// URL: http://localhost:3000/User_info/email/thor@gmail.com
app.get('/User_info/email/:email', (req, res) => { //SELECT(EMAIL)
    let email = req.params.email;
    if (!email) {
        return res.status(400).send({ error: true, message: 'Please provide email.' });
    }
    connection.query('SELECT * FROM User_info WHERE email = ?', email, (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});

// Testing insert a user
// Case:1
// method: POST
// URL: http://localhost:3000/User_info
// body1: raw JSON
// {
//   "user_info":{
//      "Firstname": "Viphu",
//      "Lastname": "Sopanakitkosol",
//      "Username": "MeenVP",
//      "Password": "Shopflax123",
//      "email": "cat@gmail.com",
//      "role": "user"
//    }
// }
// Case:2
// method: POST
// URL: http://localhost:3000/User_info
// body: raw JSON
// {
//   "user_info":{
//      "Firstname": "Peter",
//      "Lastname": "Parker",
//      "Username": "Spiderman",
//      "Password": "Spiderverse358",
//      "email": "Spidey@gmail.com",
//      "role": "user"
//    }
// }
app.post('/User_info', (req, res) => { //INSERT
    let user = req.body.user_info;
    if (!user) {
        return res.status(400).send({ error: true, message: 'Please provide user information' })
    }
    connection.query("INSERT INTO User_info SET ?", user, (error, results, fields) => {
        if (!error) {
            return res.send({ error: false, data: results.affectedRows, message: 'User retrieved' });
        } else {
            res.send(error);
        }

    })
});
// Testing update a user
// Case:1
// method: PUT
// URL: http://localhost:3000/User_info
// body: raw JSON
// {
//   "user_info":{
//      "Firstname": "Viphu",
//      "Lastname": "Sopanakitkosol",
//      "Username": "MeenVP",
//      "Password": "Shopflax123",
//      "email": "dolphin@gmail.com",
//      "role": "user"
//    }
// }
// Case:2
// method: PUT
// URL: http://localhost:3000/User_info
// body: raw JSON
// {
//   "user_info":{
//      "Firstname": "Peter",
//      "Lastname": "Parker",
//      "Username": "Spiderman",
//      "Password": "Spiderpig3811",
//      "email": "Spidey@gmail.com",
//      "role": "user"
//    }
// }
app.put('/User_info', (req, res) => { //UPDATE
    let user = req.body.user_info;
    let username = req.body.user_info.Username;
    if (!user) {
        return res.status(400).send({ error: true, message: 'Please provide user information' })
    }
    connection.query("UPDATE User_info SET ? WHERE Username = ?", [user, username], (error, results, fields) => {
        if (!error) {
            return res.send({ error: false, data: results.affectedRows, message: 'User has been updated' });
        } else {
            res.send(error);
        }

    })
});
// Testing delete a user
// method: DELETE
// URL: http://localhost:3000/User_info
// Case:1
// body: raw JSON
// {
//   "Username": "Meen"
// }
// Case:2
// body: raw JSON
// {
//   "Username": "Spiderman"
// }

app.delete('/User_info', (req, res) => { //DELETE
    let username = req.body.Username;
    if (!username) {
        return res.status(400).send({ error: true, message: 'Please provide username.' });
    }
    connection.query('DELETE FROM User_info WHERE Username = ?', username, (error, results, fields) => {
        if (!error) {
            res.send("user deleted");
        } else {
            res.send(error);
        }

    })
});
/************************************************************ PRODUCT **********************************************************/
// Testing Select all products
// method: GET
// URL: http://localhost:3000/Product_info
app.get('/Product_info', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM Product_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
// Testing Select a product
// method: GET
// Case:1
// URL: http://localhost:3000/Product_info/2
// Case:2
// URL: http://localhost:3000/Product_info/4
app.get('/Product_info/:Product_ID', (req, res) => { //SELECT
    let id = req.params.Product_ID;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide product id.' });
    }
    connection.query('SELECT * FROM Product_info WHERE Product_ID = ?', id, (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
// Testing insert a product
// Case:1
// method: POST
// URL: http://localhost:3000/Product_info
// body: raw JSON
// {
//   "Product_info":{
//      "Product_ID": 6,
//      "Product_Name": "CATWATCH",
//      "Product_Price": 7500,
//      "Product_Quantity": 3,
//      "Product_Description": "It's a catwatch.",
//      "Product_Image": "https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/coco-mademoiselle-eau-de-parfum-intense-spray-3-4fl-oz--packshot-default-116660-8848376889374.jpg",
//      "Product_Category": "Watch"
//    }
// }
// Case:2
// method: POST
// URL: http://localhost:3000/Product_info
// body: raw JSON
// {
//   "Product_info":{
//      "Product_ID": 6,
//      "Product_Name": "Panther bag",
//      "Product_Price": 16900,
//      "Product_Quantity": 7,
//      "Product_Description": "Made in Wakanda.",
//      "Product_Image": "https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/coco-mademoiselle-eau-de-parfum-intense-spray-3-4fl-oz--packshot-default-116660-8848376889374.jpg",
//      "Product_Category": "Watch"
//    }
// }
app.post('/Product_info', (req, res) => { //INSERT
    let product = req.body.Product_info;
    if (!product) {
        return res.status(400).send({ error: true, message: 'Please provide product information' })
    }
    connection.query("INSERT INTO Product_info SET ?", product, (error, results, fields) => {
        if (!error) {
            return res.send({ error: false, data: results.affectedRows, message: 'product retrieved' });
        } else {
            res.send(error);
        }

    })
});
// Testing update a product
// Case:1
// method: PUT
// URL: http://localhost:3000/Product_info
// body: raw JSON
// {
//   "Product_info":{
//      "Product_ID": 6,
//      "Product_Name": "CATWATCH",
//      "Product_Price": 999999,
//      "Product_Quantity": 3,
//      "Product_Description": "It's not a catwatch.",
//      "Product_Image": "https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/coco-mademoiselle-eau-de-parfum-intense-spray-3-4fl-oz--packshot-default-116660-8848376889374.jpg",
//      "Product_Category": "Watch"
//    }
// }
// Case:2
// method: POST
// URL: http://localhost:3000/Product_info
// body: raw JSON
// {
//   "Product_info":{
//      "Product_ID": 7,
//      "Product_Name": "Panther bag",
//      "Product_Price": 16900,
//      "Product_Quantity": 7,
//      "Product_Description": "Made in Wakanda.",
//      "Product_Image": "https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/coco-mademoiselle-eau-de-parfum-intense-spray-3-4fl-oz--packshot-default-116660-8848376889374.jpg",
//      "Product_Category": "Handbag"
//    }
// }
app.put('/Product_info', (req, res) => { //UPDATE
    let product = req.body.Product_info;
    let id = req.body.Product_info.Product_ID;
    if (!product) {
        return res.status(400).send({ error: true, message: 'Please provide product information' })
    }
    connection.query("UPDATE Product_info SET ? WHERE Product_ID = ?", [product, id], (error, results, fields) => {
        if (!error) {
            return res.send({ error: false, data: results.affectedRows, message: 'Product has been updated' });
        } else {
            res.send(error);
        }

    })
});
// Testing delete a user
// Case:1
// method: DELETE
// URL: http://localhost:3000/Product_info
// body: raw JSON
// {
//   "Product_ID": "6"
// }
// Case:2
// method: DELETE
// URL: http://localhost:3000/Product_info
// body: raw JSON
// {
//   "Product_ID": "7"
// }

app.delete('/Product_info', (req, res) => { //DELETE
    let id = req.body.Product_ID;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide product id.' });
    }
    connection.query('DELETE FROM Product_info WHERE Product_ID = ?', id, (error, results, fields) => {
        if (!error) {
            res.send("Product deleted");
        } else {
            res.send(error);
        }

    })
});
/************************************************************ LOGIN **********************************************************/
// Testing Select all logged in users
// method: GET
// URL: http://localhost:3000/Login_info
app.get('/Login_info', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM Login_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});

app.get('/Login_info/:Username', (req, res) => { //SELECT
    let username = req.params.Username;
    if (!username) {
        return res.status(400).send({ error: true, message: 'Please provide username.' });
    }
    connection.query('SELECT * FROM Login_info WHERE Username = ?', username, (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
// Testing insert a user
// method: POST
// URL: http://localhost:3000/Login_info
// body: raw JSON
// {
//      "Username": "Meen",
// }
app.post('/Login_info', (req, res) => { //INSERT
    let user = req.body.Username;
    if (!user) {
        return res.status(400).send({ error: true, message: 'Please provide user information' })
    }
    connection.query("INSERT INTO Login_info(Username,Login_log) VALUE (?,NOW())", user, (error, results, fields) => {
        if (!error) {
            return res.send({ error: false, data: results.affectedRows, message: 'User retrieved' });
        } else {
            res.send(error);
        }

    })
});
// Testing update a user
// method: PUT
// URL: http://localhost:3000/Login_info
// body: raw JSON
// {
//      "Username": "Meen",
// }
app.put('/Login_info', (req, res) => { //UPDATE
    let username = req.body.Username;
    if (!username) {
        return res.status(400).send({ error: true, message: 'Please provide user information' })
    }
    connection.query("UPDATE Login_info SET Login_log=NOW() WHERE Username = ?", username, (error, results, fields) => {
        if (!error) {
            return res.send({ error: false, data: results.affectedRows, message: 'User has been updated' });
        } else {
            res.send(error);
        }

    })
});
// Testing delete a user
// method: DELETE
// URL: http://localhost:3000/Login_info
// body: raw JSON
// {
//      "Username": "Meen",
// }
app.delete('/Login_info', (req, res) => { //DELETE
    let username = req.body.Username;
    if (!username) {
        return res.status(400).send({ error: true, message: 'Please provide username.' });
    }
    connection.query('DELETE FROM Login_info WHERE Username = ?', username, (error, results, fields) => {
        if (!error) {
            res.send("user deleted");
        } else {
            res.send(error);
        }

    })
});
/************************************************************ CRUD **********************************************************/
console.log("Hello");
const router = express.Router();
app.use("/", router); // Register the router

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", function(req, res) {
    console.log("Home page");
    res.sendFile(path.join(__dirname + '/index.html'));
});
router.get("/index.html", function(req, res) {
    console.log("Home page");
    res.sendFile(path.join(__dirname + '/index.html'));
});
router.get("/login.html", function(req, res) {
    console.log("login page");
    res.sendFile(path.join(__dirname + '/login.html'));
});
router.get("/register.html", function(req, res) {
    console.log("register page");
    res.sendFile(path.join(__dirname + '/register.html'));
});
router.get("/succ.html", function(req, res) {
    console.log("register successful");
    res.sendFile(path.join(__dirname + '/succ.html'));
});
router.get("/search.html", function(req, res) {
    console.log("search page");
    res.sendFile(path.join(__dirname + '/search.html'));
});
router.get("/shop.html", function(req, res) {
    console.log("shop page");
    res.sendFile(path.join(__dirname + '/shop.html'));
});
router.get("/aboutus.html", function(req, res) {
    console.log("about us page");
    res.sendFile(path.join(__dirname + '/aboutus.html'));
});
app.use((req, res, next) => { //PAGE NOT FOUND
    console.log("404: Invalid accessed");
    res.status(404).sendFile(path.join(__dirname + '/404.html'));
});