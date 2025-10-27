const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const User = require("./database")
const bcrypt = require('bcrypt');



const viewsPath = path.join(__dirname, '../views')
const publicPath = path.join(__dirname, '../public')
const pagesPath = path.join(__dirname, '../pages')
const srcPath = path.join(__dirname, '../src')

app.use(express.static(srcPath))
app.use(express.static(pagesPath))
app.use(express.static(publicPath))
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", viewsPath)
app.use(express.urlencoded({extended:false}))


//going to the home page
app.get("/", (req, res) =>{
    res.render("home")
})

//going to the login page
app.get("/login", (req, res) =>{
    res.render("login")
})
//going to the goals page
app.get("/goals.html", (req, res) =>{
    res.render("goals")
})
//going to the timer page
app.get("/timer.html", (req, res) =>{
    res.render("timer")
})

app.get("/schedule", (req, res) =>{
    res.render("schedule")
})

app.get("/signup", (req, res) =>{
    res.render("signup")
})


app.post("/signup", async (req, res) => {
    const { uname, pwd } = req.body;

    try {

        //Checking if the user already exists
        const existUser = await User.findOne({ username: uname})

        //If the user exists, send an error
        if(existUser){
            return res.render("signup", { error: "Username already exists. Please log in instead." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pwd, saltRounds);

        //if user doesn't exist it will store data into a object
        const data = {
        username:req.body.uname,
        password: hashedPassword
        }


        await User.create(data);
        console.log("New user added: ", data.username);
        res.render("home");
        
    } catch (error) {
        console.error(error);
        res.send("Error signing up");      
    }
});


app.post("/login", async(req, res) => {
    const {uname, pwd} = req.body;

    try {
        const existUser = await User.findOne({ username: uname});

        if(!existUser){
            return res.render("login", { error: "Username doesn't exist in our database. Please try again."})
        }

        const isPasswordValid = await bcrypt.compare(pwd, existUser.password);

        if(!isPasswordValid){
            return res.render("login", { error: "Incorrect password. Please try again." })
        }

        console.log("User login successful!");
        res.render("schedule");



    } catch (err){
        console.error(error);
        res.send("Error Logging in");
    }
})

app.listen(3000, () =>{
    console.log("port connected")
    console.log(`http://localhost:3000/`)
})
