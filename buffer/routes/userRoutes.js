const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://kotha_madhuvani:madhu2112@cluster0.hx64ig0.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected to db")
    }
})

const userSchema = new mongoose.Schema({
    name: String,
    branch: String,
    password: String
})
const userSchema1 = new mongoose.Schema({
    id: String,
    name: String
})

let User = mongoose.model('detail', userSchema);
let Emp = mongoose.model('empcrud', userSchema1);

router.post("/userRegister", (req, res) => {
    console.log(req.body.name);
    User.findOne({ name: req.body.name }, (err, user) => {
        if (user) {
            res.send({ message: `user with the username ${req.body.name} already exists` })
        }
        else {
            let newuser = new User({ name: req.body.name, branch: req.body.branch, password: req.body.password });
            newuser.save((err) => {
                if (err) {
                    console.log("error occured");
                }
                else {
                    console.log("user added");
                    res.send({ message: `${req.body.name} registered successfully` });
                }
            });
        }
    })
})
router.post("/userLogin", (req, res) => {
    User.findOne({ name: req.body.name }, (err, user) => {
        if (user) {
            res.send({ message: `user found` });
        }
        else {
            res.send({ message: `User ${req.body.name} not found. Please Register` })
        }
    })
})
router.get("/getUsers", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send({ message: "could not get users" });
        }
        if (users) {
            console.log(users);
            res.send(users);
        }
    })
})
router.delete("/delUser/:id", (req, res) => {
    console.log(req.params.id);
    let i = req.params.id;
    User.findOneAndDelete({ name: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            if (user) {
                res.send({ message: `user ${user.name} deleted` })
            }
            else {
                res.send({ message: `user not found` })
            }
        }
    })
})
router.get("/getUser/:id", (req, res) => {
    User.findById({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(user);
        }
    })
})
router.post("/updateUser", (req, res) => {
    console.log(req.body);
    User.updateOne({ _id: req.params.id }, { name: req.body.name, branch: req.body.branch, password: req.body.password }, (err, usr) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ message: `user ${req.body.name} updated` });
        }
    })
})

router.post("/addEmp", (req, res) => {
    let newuser = new Emp({ id: req.body.id, name: req.body.name });
    newuser.save((err) => {
        if (err) {
            console.log("error occured");
        }
        else {
            console.log("user added");
            res.send({ message: `${req.body.name} registered successfully` });
        }
    });
})

module.exports = router;
