var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookieparser");
const dotenv =require("dotenv");
const cors = require("cors");


dotenv.config();


var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
const usuario = require("./routes/usuario");
const informacion = require("./routes/informacion");
var app =express();

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

//app.listen(80, function () { console.log('CORS-enabled web server listening on port 80') })

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
//app.set('port', process.env.PORT || 3000);
app.listen(3000, ()=> console.log('servidor corriendo en localhost:3000'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
//app.use("/users", userRouter);
app.use("/usuario", usuario);
app.use("/informacion", informacion);
