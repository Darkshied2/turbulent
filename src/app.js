const express = require("express");
const hbs = require("hbs");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const routes = require('./routes/main')
const Detail = require("./models/Detail")
const Slider = require("./models/Slider")
const Service = require("./models/Service")
const bcrypt = require("bcrypt")//importing bcrypt pakage
const passport = require("passport")
const initializePassport = require("./passport-config");
const User = require("./models/User");


const users = []

app.use(bodyParser.urlencoded({
    extended: true
}))



app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        await User.create({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // users.push({
        //     id: Date.now().toString(),
        //     name : req.body.name,
        //     email:req.body.email,
        //     password: hashedPassword,
        // })
        console.log("Created");
        res.redirect("/login")
    } catch (e) {
        console.log(e);
        res.redirect("/register")

    }
})

app.post('/login', async (req, res) => {
    const ep = req.body.password
    const ee = req.body.email
    User.findOne({ "email": ee }).then((val) => {
        console.log("found", val);
        const encryptedPass = val.password;
        bcrypt.compare(ep, encryptedPass, (err, same) => {
            if (!same) {
                console.log("wrong cred");

                res.redirect("/login")
                return;
            }
            res.redirect("/?logeedin=true")
            console.log("Logged in");
            res.render("/");

        })


    })
});







// /static/css/style.css
app.use('/static', express.static("public"))
// app.use(express.static("public"))

// app.use('/user',routes)
app.use('', routes)

//(template engine)
app.set('view engine', 'hbs')
app.set("views", "views")
hbs.registerPartials("views/partials")
// console.log(__dirname);
// hbs.registerPartials(_path.join(__dirname, '/views/partials'), function (err) {});

//db connections
mongoose.connect("mongodb://localhost/website_tut", () => {
    console.log("db connected")

    // Service.create([
    //     {
    //         icon:'/static/images/Numeracy.jpg',
    //         title:'Provide Best Courses',
    //         description:'We Provide Courses That Helps Our Students In Learning And In Placement.',
    //         linkText:'Check',
    //         link:'https://www.google.co.in'
    //     },
    //     {
    //         icon:'fa fa-caret-square-o-right',
    //         title:'Learn Projects ',
    //         description:'We Provide Courses That Helps Our Students to make innovative projects.',
    //         linkText:'Learn',
    //         link:'https://www.google.co.in'
    //     },
    //     {
    //         icon:'fa fa-superscript',
    //         title:'Practice coding',
    //         description:'We Provide a good platform where our student develop their skills in coding',
    //         linkText:'Practice',
    //         link:'https://www.google.co.in'
    //     },
    //     {
    //         icon:'fa fa-align-center',
    //         title:'Provide Best DSA Courses',
    //         description:'We Provide  the best DSA Courses That Helps Our Students In Learning And In Placement.',
    //         linkText:'Learn DSA',
    //         link:'https://www.google.co.in'
    //     },
    //     {
    //         icon:'fa fa-google-wallet',
    //         title:'Provide Quiz section',
    //         description:'We Provide a Quiz section where students check their level of knowledge',
    //         linkText:'Start',
    //         link:'https://www.google.co.in'
    //     },
    // ])




    // Slider.create([
    //     {
    //         title:'HACKER',
    //         subTitle:'Hacker is also a good coder',
    //         imageUrl:"/static/images/andre-benz-qi2hmCwlhcE-unsplash.jpg"
    //     },
    //     {
    //         title:'BLACK HAT HACKER',
    //         subTitle:'Black hat hackers are notoriously known to infiltrate into networks and systems by creating and spreading malware.',
    //         imageUrl:"/static/images/ciaran-o-brien-LoGWCnEVDgU-unsplash.jpg"
    //     },
    //     {
    //         title:'WHITE HAT HACKER',
    //         subTitle:'Not all hackers are bad, some are white hat hackers also',
    //         imageUrl:"/static/images/clay-banks-hwLAI5lRhdM-unsplash.jpg"
    //     },
    //     {
    //         title:'GREY HAT HACKER',
    //         subTitle:'These hackers have characteristics from both black and white hat hackers, but they generally carry out their hacking missions without seeking permissions from anyone.',
    //         imageUrl:"/static/images/jezael-melgoza-_noSmX8Kgoo-unsplash.jpg"
    //     },
    //     {
    //         title:'HARSH HACKER',
    //         subTitle:'I am Hacker',
    //         imageUrl:"/static/images/yu-kato-824OwkP7sgk-unsplash.jpg"
    //     },

    // ])




    // Detail.create({
    //     brandName:"Turbulent",
    //     // brandIconUrl:"https://te.legra.ph/file/034d3cb90b68acc00db28.jpg",
    //     links:[
    //         {
    //             label:"Home",
    //             url:"/"
    //         },
    //         {
    //             label:"Services",
    //             url:"/#services_section"
    //         },
    //         {
    //             label:"Gallery",
    //             url:"/gallery"
    //         },
    //         {
    //             label:"About",
    //             url:"/#about_section"
    //         },
    //         {
    //             label:"Contact Us",
    //             url:"/#contact_us_section"
    //         },
    //     ]
    // })
})

// app.get("/about",(req,res)=>{
//     res.send("wow this is data from server")
// })
mongoose.con


app.listen(process.env.PORT | 5000, () => {
    console.log("server started");
})