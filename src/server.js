const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")

const viewsPath = path.join(__dirname, '../views')
const publicPath = path.join(__dirname + '/public')


app.use(express.static(publicPath))
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", viewsPath)

app.get("/", (req, res) =>{
    res.render("home")
})

app.get("/login", (req, res) =>{
    res.render("login")
})

app.listen(3000, () =>{
    console.log("port connected")
    console.log(`http://localhost:3000/`)
})
