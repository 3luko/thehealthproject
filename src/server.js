const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")

const viewsPath = path.join(__dirname, '../views')
const publicPath = path.join(__dirname, '../public')
const pagesPath = path.join(__dirname, '../pages')
const srcPath = path.join(__dirname, '../src')


app.use(express.static(pagesPath))
app.use(express.static(publicPath))
app.use(express.static(srcPath))
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", viewsPath)


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

app.listen(3000, () =>{
    console.log("port connected")
    console.log(`http://localhost:3000/`)
})
