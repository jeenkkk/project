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

app.get('/User_info', (req, res) => {
    connection.query('SELECT * FROM User_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
app.get('/User_info/:id', (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide student id.' });
    }
    connection.query('SELECT * FROM User_info WHERE id = ?', id, (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});

//delete
app.delete('/personal_info/:id', (req, res) => {
    let student_id = req.params.id;
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide student id.' });
    }
    connection.query('DELETE FROM personal_info WHERE StudentID = ?', student_id, (error, results, fields) => {
        if (!error) {
            res.send("User already deleted");
        } else {
            res.send(error);
        }

    })
});

//insert
app.post('/personal_info', (req, res) => {
    let Student = req.body;
    let sql = "INSERT INTO personal_info (StudentID,Firstname,Lastname,DOB,Mobilephone) VALUES (?, ?, ?, ?, ?)"
    connection.query(sql, [Student.StudentID, Student.Firstname, Student.Lastname, Student.DOB, Student.Mobilephone], (error, results, fields) => {
        if (!error) {
            res.send("User already added");
        } else {
            res.send(error);
        }

    })
});

//update
app.put('/personal_info', (req, res) => {
    let Student = req.body;
    let sql = "UPDATE personal_info SET Firstname = ?, Lastname = ?, DOB = ?, Mobilephone = ? WHERE StudentID = ?"
    connection.query(sql, [Student.Firstname, Student.Lastname, Student.DOB, Student.Mobilephone, Student.StudentID], (error, results, fields) => {
        if (!error) {
            res.send("User already updated");
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
router.post("/index.html", function(req, res) { //login form submit
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
});
router.get("/register.html", function(req, res) {
    console.log("register page");
    res.sendFile(path.join(__dirname + '/register.html'));
});
router.get("/succ.html", function(req, res) {
    console.log("register successful");
    res.sendFile(path.join(__dirname + '/succ.html'));
});
router.post("/succ.html", function(req, res) { //Register form submit
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