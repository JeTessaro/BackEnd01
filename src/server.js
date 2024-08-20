const express = require('express');
const userRouter = require('./routes/users.router.js');
const productRouter = require('./routes/products.router.js');
const pruebaRouter = require('./routes/pruebas.router.js');
const viewsRouter = require('./routes/views.router.js');
const logger = require('morgan');
const { uploader } = require('./utils/multer.js');
const handlebars    = require('express-handlebars');
const path = require('path');

const { Server } = require('socket.io');
const { chatSocket } = require('./utils/chatSocket.js'); 
const PORT = process.env.PORT || 8080;

const app = express(); 

const httpServer = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado')

    socket.on('message', data => {
        console.log(data)
    })
})


console.log(__dirname + '/public');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));

// configuración del motor de plantillas
app.engine('handlebars', handlebars.engine())
// configurar la carpeta donde debe tomar las plantillas
app.set('views', __dirname + '/views')
// extención de las plantillas
app.set('view engine', 'handlebars')


console.log('Rutas de las vistas configuradas en:', ('views', __dirname + '/views'));

app.use('/', viewsRouter);
app.use('/pruebas', pruebaRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

console.log(`Servidor corriendo en http://localhost:${PORT}`);

app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).send('error de server');
});

// Definición de la función productSocket antes de usarla
const productSocket = (io) => {
    io.on('connection', async socket => {
        console.log('Nuevo cliente conectado');
        const {
            getProducts,
            createProduct
        } = new ProductsManagerFs();
        const products = await getProducts();
        socket.emit('productList', products);

        socket.on('addProduct', async data => {
            await createProduct(data);
        });
    });
};

productSocket(io)