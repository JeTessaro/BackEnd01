const express       = require('express')
const userRouter    = require('./routes/users.router.js')
const productRouter = require('./routes/product.router.js')
const cartsRouter = require('./routes/carts.router.js')
const pruebaRouter = require('./routes/pruebas.router.js')
const viewsRouter = require('./routes/views.router.js')
const logger        = require('morgan')
const { uploader }  = require('./utils/multer.js')
const handlebars    = require('express-handlebars')
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.post('/uploader', uploader.single('myFile'), (req, res)=>{
  res.send('archivo subido')
})

app.use('/pruebas', pruebaRouter)
app.use('/api/users', userRouter)
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).send("error de server");
});

app.listen(PORT, () => {
  console.log("escuchando en el puerto: ", PORT);
});
