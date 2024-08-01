const {} = require('express')
const ProductManagerFs = require('../src/managers/FileSystem/products.managers')

const router = Router()

const {
    getProducts
} = new ProductManagerFs()

router.get('/', async (req,res)=>{
    try {
        const productsDb = await getProducts()
        res.send({status: 'success', data: productsDb})
    } catch (error) {
       console.log(error) 
    }
})

router.post('/', async (req, res) => {
    try {
        const { body } = req
        const response = await ProductManagerFs.createProduct(body)

        res.send({status: 'success', data: response})
    } catch (error) {
        console.log(error)        
    }
})

router.put('/', async (req, res) => {
    try {
        const { body } = req
        const response = await ProductManagerFs.udateProduct(body)

        res.send({status: 'success', data: response})
    } catch (error) {
        console.log(error)        
    }
})

router.delete('/', async (req, res) => {
    try {
        const { body } = req
        const response = await ProductManagerFs.deleteProduct(body)

        res.send({status: 'success', data: response})
    } catch (error) {
        console.log(error)        
    }
})


module.exports = router