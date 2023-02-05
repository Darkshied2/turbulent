const express = require('express');
const { route } = require('express/lib/application');
const async = require("hbs/lib/async");
const Contact = require("../models/contact");
// const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")//importing bcrypt pakage
const Detail = require("../models/Detail");
const Slider = require("../models/Slider");
const Service = require("../models/Service");

const users = []

const routes = express.Router()

// if (typeof localStorage === "undefined" || localStorage === null) {
//     const LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
//   }



//  function checkLogin(req,res,next){
//     var myToken = localStorage.getItem('myToken');
//     try {
//         jwt.verify(mytoken, 'loginToken');
//       } catch(err) {
//        res.send("you need login to access this page");
//       }
//       next();
//  } 
routes.get("/", async (req, res) => {
    // routes.get("/", checkLogin,async(req,res)=>{

    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    const slides = await Slider.find()

    const services = await Service.find()
    console.log(req.query);


    res.render("index", {
        details: details,
        slides: slides,
        services: services
    });

    // if (!req.query.logeedin) {
    //     res.render("login")
    // } else {
        
    // }

    res.render("login")
});

routes.get('/gallery', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("gallery", {
        details: details,

    });
});

routes.get('/subject', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("subject", {
        details: details,

    });
});

routes.get('/gate', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("gate", {
        details: details,

    });
});

routes.get('/creaters', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("creaters", {
        details: details,

    });
});

routes.get('/game', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("game", {
        details: details,

    });
});

routes.get('/minigame', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("minigame", {
        details: details,

    });
});

routes.get('/feedback', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("feedback", {
        details: details,

    });
});



routes.get('/jee', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("jee", {
        details: details,

    });
});

routes.get('/motivate', async (req, res) => {
    const details = await Detail.findOne({ "_id": "63cacac947188bbd705428b2" })
    res.render("motivate", {
        details: details,

    });
});


// routes.get('/login',async(req,res,)=>{
//     // const details=await Detail.findOne({"_id":"63cacac947188bbd705428b2"})
//     res.render("login");

// });




// routes.get('/login',async(req,res, next)=>{
//     var token = jwt.sign({ foo: 'bar' }, 'loginToken');
//     localStorage.setItem('myToken', token);


//     // console.log(localStorage.getItem('myFirstKey'));


//         res.send("Login successfully");
//         });


// routes.get('/logout',async(req,res, next)=>{
//     localStorage.setItem('myToken', token);
//     localStorage.removeItem('mytoken');
//         res.send("Logout succesfully");
//         });






routes.get('/register', async (req, res) => {
    res.render("register");
});
routes.get('/login', async (req, res) => {
    res.render("login");
});





//process contact form
routes.post("/process-contact-form", async (request, response) => {
    console.log("form is submitted")
    console.log(request.body)

    //save the data to db
    try {

        const data = await Contact.create(request.body)
        console.log(data)
        response.redirect("/")

    } catch (e) {
        console.log(e)
        response.redirect("/")
    }
})
module.exports = routes;