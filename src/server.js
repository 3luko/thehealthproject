const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const User = require("./database")



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

        const existUser = await User.findOne({ username: uname})

        if(existUser){
            return res.render("signup", { error: "Username already exists. Please log in instead." });
        }



        const data = {
        username:req.body.uname,
        password:req.body.pwd
        }

        await User.create(data);
        console.log("New user added: ", data.username);
        res.render("home");
        
    } catch (error) {
        console.error(error);
        res.send("Error signing up");      
    }
});

app.listen(3000, () =>{
    console.log("port connected")
    console.log(`http://localhost:3000/`)
})
