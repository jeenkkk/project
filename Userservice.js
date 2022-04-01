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
app.get('/User_info', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM User_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
app.get('/User_info:Username', (req, res) => { //SELECT
    let username = req.body.Username;
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
/************************************************************ PRODUCT **********************************************************/

app.get('/Product_info', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM Product_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
app.get('/Product_info:Product_ID', (req, res) => { //SELECT
    let id = req.body.Product_ID;
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
/************************************************************ LOGIN **********************************************************/
app.get('/Login_info', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM Login_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
app.get('/Login_info:username', (req, res) => { //SELECT
    let username = req.body.Username;
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
/*router.post("/index.html", function(req, res) { //login form submit
    const user = req.body;
    console.log(user);
    connection.query('SELECT Username,email,Password FROM User_info WHERE Username = ?', user.Username, (error, results, fields) => {
        if (typeof results[0] !== 'undefined') {
            if (results[0].Username == user.Username && results[0].Password == user.Password) {
                connection.query('INSERT INTO login_info(Username,Login_log) VALUE(?,NOW())', results[0].Username, (error, results, fields) => {
                    if (error) throw error;
                    console.log(`User: ${user.Username} Logged in`);
                    res.sendFile(path.join(__dirname + '/index.html'));
                })
            } else {
                console.log(`Wrong Username or Password`);
            }
        } else {
            connection.query('SELECT Username,email,Password FROM User_info WHERE email = ?', user.Username, (error, results, fields) => {
                if (typeof results[0] !== 'undefined') {
                    console.log(results[0]);
                    const username = results[0].Username;
                    if (results[0].email == user.Username && results[0].Password == user.Password) {
                        connection.query('INSERT INTO login_info(Username,Login_log) VALUE(?,NOW())', results[0].Username, (error, results, fields) => {
                            if (error) throw error;
                            console.log(`User: ${username} Logged in`);
                            res.sendFile(path.join(__dirname + '/index.html'));
                        })
                    }
                } else {
                    console.log(`Wrong Username or Password`);
                }
            })
            console.log(`Wrong Username or Password`);
        }
    })
});*/
router.get("/register.html", function(req, res) {
    console.log("register page");
    res.sendFile(path.join(__dirname + '/register.html'));
});
router.get("/succ.html", function(req, res) {
    console.log("register successful");
    res.sendFile(path.join(__dirname + '/succ.html'));
});
/*router.post("/succ.html", function(req, res) { //Register form submit
    const user = req.body;

    connection.query('SELECT Username FROM User_info WHERE Username = ?', user.Username, (error, results, fields) => {
        if (typeof results[0] !== 'undefined') {
            if (results[0].Username == user.Username) {
                console.log(`User: ${user.Username} is already registered`);
                res.sendFile(path.join(__dirname + '/register.html'));
            }
        } else {
            const insert = ("INSERT INTO user_info(Firstname,Lastname,Username,Password,email,role) VALUES (?,?,?,?,?,?)");
            connection.query(insert, [user.Firstname, user.Lastname, user.Username, user.Password, user.email, "user"], function(error, results) {
                if (error) throw error;
                console.log(`Form submitted by ${user.Firstname} ${user.Lastname} with ${req.method}`);
                return res.sendFile(path.join(__dirname + '/succ.html'));
            });
        }

    })

});*/
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