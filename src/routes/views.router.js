const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/product.managers')

const router = Router()


router.get('/', (req, res) => {
    res.render( 'chat', {
        isMenu: true
     })
})

const users = [
    {id: '1', full_name: 'user example 1', email: 'user1@gmail.com'},
    {id: '2', full_name: 'user example 2', email: 'user2@gmail.com'},
    {id: '3', full_name: 'user example 3', email: 'user3@gmail.com'},
]

router.get('/users', (req, res) => {

    const userLogin = {
        full_name: 'Fede el mejor',    
        role: 'admin'
    }

    res.render('users', {
        user: userLogin,
        isAdmin: userLogin.role === 'admin',
        users,
        title: 'HOME',
        styles: 'index.css',
        isMenu: true
    })
})

//Importación de productos
router.get('/home', (req, res) => {
    const { getProducts } = new ProductsManagerFs()
    const produtcs = getProducts()
    res.render('home', {produtcs})
})

//Importación de productos
router.get('/realtimeproducts', (req, res) => {
     res.render('realtimeproducts', {})
    
})



module.exports = router