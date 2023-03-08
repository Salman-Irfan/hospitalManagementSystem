const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/db.js");
const User = require("./models/user.js").User;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = 4000;
User();
dbConnection();

app.get("/", function(req, res) { // request from db
    res.send("welcome to hms");
});

app.post("/login", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email })
        .then(function(user) {
            if (user) {
                if (password === user.password) {
                    res.send({ message: "login successful", user: user });
                } else {
                    res.send({ message: "password didn't match" });
                }
            } else {
                res.send({ message: "user not found" });
            }
        })
        .catch(function(err) {
            console.log(err);
            res.send({ message: "error occurred" });
        });
});

app.post("/register", async function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    try {
        var user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }

        var newUser = new User({ name: name, email: email, password: password });
        await newUser.save();

        res.status(201).json({ message: "Successfully registered" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, function() {
    console.log("the server is running in the port " + PORT);
});
