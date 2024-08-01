const {} = require('express')
const ProductManagerFs = require('../src/managers/FileSystem/carts.managers')
const CartsManagerFs = require('../managers/FileSystem/carts.managers')

const router = Router()

const {
    getcarts
} = new CartsManagerFs()

router.get('/', async (req,res)=>{
    try {
        const cartsDb = await getCarts()
        res.send({status: 'success', data: cartsDb})
    } catch (error) {
       console.log(error) 
    }
})

router.post('/', async (req, res) => {
    try {
        const { body } = req
        const response = await CartsManagerFs.createCarts(body)

        res.send({status: 'success', data: response})
    } catch (error) {
        console.log(error)        
    }
})

router.put('/', async (req, res) => {
    try {
        const { body } = req
        const response = await CartsManagerFs.udatecarts(body)

        res.send({status: 'success', data: response})
    } catch (error) {
        console.log(error)        
    }
})

router.delete('/', async (req, res) => {
    try {
        const { body } = req
        const response = await CartsManagerFs.deleteCarts(body)

        res.send({status: 'success', data: response})
    } catch (error) {
        console.log(error)        
    }
})


module.exports = router